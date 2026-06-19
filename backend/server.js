import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import whatsAppPkg from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsAppPkg;
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
const WHATSAPP_DATA_PATH = "/Users/matiassack/Documents/Matias/whatsapp-session";
const WHATSAPP_CLIENT_ID = "mecanica-backend";
const WHATSAPP_USER_DATA_DIR = path.join(WHATSAPP_DATA_PATH, `session-${WHATSAPP_CLIENT_ID}`);

// Conexión y Pool de MySQL
let pool;

async function initializeDatabase() {
  const dbUrl = process.env.DATABASE_URL || `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '3306'}/${process.env.DB_NAME || 'mecanica'}`;
  
  if (!dbUrl) {
    console.error("DATABASE_URL o variables DB_... no configuradas en .env");
    process.exit(1);
  }

  try {
    // 1. Conectar sin base de datos especificada para poder crearla si no existe
    const lastSlashIdx = dbUrl.lastIndexOf('/');
    const connectionUriWithoutDb = dbUrl.substring(0, lastSlashIdx);
    const dbName = dbUrl.substring(lastSlashIdx + 1);

    console.log(`Conectando a MySQL en: ${connectionUriWithoutDb} ...`);
    const tempConnection = await mysql.createConnection(connectionUriWithoutDb);
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await tempConnection.end();
    console.log(`Base de datos \`${dbName}\` asegurada.`);

    // 2. Conectar con la base de datos específica e inicializar pool
    pool = mysql.createPool(dbUrl);

    // 3. Crear tabla si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS car_config (
        id INT PRIMARY KEY DEFAULT 1,
        kmActual INT NOT NULL DEFAULT 90000,
        kmAnual INT NOT NULL DEFAULT 12000,
        email VARCHAR(255) DEFAULT '',
        whatsapp VARCHAR(255) DEFAULT '',
        enableEmail BOOLEAN DEFAULT TRUE,
        enableWhatsapp BOOLEAN DEFAULT TRUE,
        aceiteDate VARCHAR(50) DEFAULT '2025-10-10',
        aceiteKm INT DEFAULT 85000,
        bujiasDate VARCHAR(50) DEFAULT '2024-06-01',
        bujiasKm INT DEFAULT 70000,
        frenosDate VARCHAR(50) DEFAULT '2025-06-01',
        correaDate VARCHAR(50) DEFAULT '2022-06-01',
        correaKm INT DEFAULT 60000,
        refrigeranteDate VARCHAR(50) DEFAULT '2024-06-01',
        refrigeranteKm INT DEFAULT 70000,
        lastAlertSentDate VARCHAR(50) DEFAULT NULL,
        CONSTRAINT single_row CHECK (id = 1)
      )
    `);

    // 4. Insertar fila por defecto si está vacía
    await pool.query('INSERT IGNORE INTO car_config (id) VALUES (1)');
    console.log("✅ Tabla car_config inicializada en MySQL.");
  } catch (err) {
    console.error("❌ Fallo al inicializar base de datos MySQL:", err);
    process.exit(1);
  }
}

// Matar procesos colgados de Puppeteer/Chrome para este cliente específico
function killStaleBrowser() {
  try {
    execSync(`pkill -f "${WHATSAPP_USER_DATA_DIR}"`, { stdio: "ignore" });
    console.log("WhatsApp: proceso Chrome anterior terminado.");
  } catch { /* no había proceso */ }
  // Eliminar locks
  for (const lockFile of ["SingletonLock", "SingletonCookie", "SingletonSocket"]) {
    try { fs.rmSync(path.join(WHATSAPP_USER_DATA_DIR, lockFile)); } catch {}
  }
}

// Inicializar cliente de WhatsApp Web
killStaleBrowser();
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: WHATSAPP_CLIENT_ID,
    dataPath: WHATSAPP_DATA_PATH,
  }),
  puppeteer: {
    headless: true,
    protocolTimeout: 120_000,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-notifications",
      "--disable-infobars",
      "--no-default-browser-check",
      "--disable-features=TranslateUI",
    ],
  },
});

let isWhatsAppReady = false;

client.on('qr', (qr) => {
  console.log("=======================================================================");
  console.log("WHATSAPP QR DETECTADO. Escanealo para conectar el Manual de Mecánica:");
  qrcode.generate(qr, { small: true });
  console.log("=======================================================================");
});

client.on('ready', () => {
  isWhatsAppReady = true;
  console.log("✅ WhatsApp Web listo para enviar alertas.");
});

client.on('auth_failure', (msg) => {
  isWhatsAppReady = false;
  console.error("❌ Fallo de autenticación en WhatsApp Web:", msg);
});

client.on('disconnected', (reason) => {
  isWhatsAppReady = false;
  console.warn("⚠️ WhatsApp Web desconectado. Reintentando...", reason);
});

client.initialize().catch((err) => {
  console.error("❌ Error inicializando WhatsApp Web:", err);
});

// Normalizar números de teléfono para Argentina (+54 9 ...)
function normalizeNumber(raw) {
  const cleaned = raw.replace(/\D/g, "");
  if (!cleaned) return cleaned;
  let n = cleaned;
  if (n.startsWith("00")) n = n.slice(2);
  n = n.replace(/^0+/, "");
  if (n.startsWith("549")) return n;
  if (n.startsWith("54") && !n.startsWith("549")) {
    return "549" + n.slice(2);
  }
  if (!n.startsWith("54")) {
    return "549" + n;
  }
  return n;
}

// Envío de Email via Brevo (SMTP v3 API)
async function sendViaBrevo(to, subject, htmlContent) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    console.error("Brevo: Falta configurar API Key o Email emisor.");
    return false;
  }
  
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Manual de Mecánica Gol Trend", email: senderEmail },
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("Brevo Exception:", e);
    return false;
  }
}

// Envío de Email via SendGrid
async function sendViaSendGrid(to, subject, htmlContent) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    console.error("SendGrid: Falta configurar API Key o Email emisor.");
    return false;
  }
  
  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }], subject }],
        from: { email: senderEmail, name: "Manual de Mecánica Gol Trend" },
        content: [{ type: "text/html", value: htmlContent }],
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("SendGrid Exception:", e);
    return false;
  }
}

// Endpoints de configuración de auto (CRUD sobre MySQL)
app.get('/api/car-config', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM car_config WHERE id = 1');
    if (rows.length === 0) {
      await pool.query('INSERT IGNORE INTO car_config (id) VALUES (1)');
      const [newRows] = await pool.query('SELECT * FROM car_config WHERE id = 1');
      return res.json(newRows[0]);
    }
    // Mapear booleanos numéricos de MySQL a booleanos reales
    const config = rows[0];
    config.enableEmail = !!config.enableEmail;
    config.enableWhatsapp = !!config.enableWhatsapp;
    res.json(config);
  } catch (err) {
    console.error("Error al obtener car_config:", err);
    res.status(500).json({ error: 'Fallo al recuperar la configuración de MySQL.' });
  }
});

app.post('/api/car-config', async (req, res) => {
  const {
    kmActual, kmAnual, email, whatsapp, enableEmail, enableWhatsapp,
    aceiteDate, aceiteKm, bujiasDate, bujiasKm, frenosDate,
    correaDate, correaKm, refrigeranteDate, refrigeranteKm, lastAlertSentDate
  } = req.body;

  try {
    await pool.query(`
      UPDATE car_config SET 
        kmActual = ?, kmAnual = ?, email = ?, whatsapp = ?, 
        enableEmail = ?, enableWhatsapp = ?, aceiteDate = ?, aceiteKm = ?, 
        bujiasDate = ?, bujiasKm = ?, frenosDate = ?, correaDate = ?, 
        correaKm = ?, refrigeranteDate = ?, refrigeranteKm = ?, lastAlertSentDate = ?
      WHERE id = 1
    `, [
      kmActual, kmAnual, email, whatsapp, 
      enableEmail ? 1 : 0, enableWhatsapp ? 1 : 0, aceiteDate, aceiteKm, 
      bujiasDate, bujiasKm, frenosDate, correaDate, 
      correaKm, refrigeranteDate, refrigeranteKm, lastAlertSentDate || null
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error al guardar car_config:", err);
    res.status(500).json({ error: 'Fallo al guardar la configuración en MySQL.' });
  }
});

// Endpoint POST para disparar notificaciones
app.post('/api/send-alert', async (req, res) => {
  const { email, whatsapp, title, message, html } = req.body;
  
  if (!email && !whatsapp) {
    return res.status(400).json({ error: 'Se requiere al menos un correo o un número de WhatsApp.' });
  }

  let emailSent = false;
  let whatsappSent = false;

  // 1. Procesar Envío por Email
  if (email) {
    console.log(`Enviando alerta por email a: ${email}`);
    // Intentar primero con Brevo
    emailSent = await sendViaBrevo(email, title, html || message);
    if (!emailSent) {
      // Reintentar con SendGrid si falla
      emailSent = await sendViaSendGrid(email, title, html || message);
    }
  }

  // 2. Procesar Envío por WhatsApp
  if (whatsapp) {
    if (!isWhatsAppReady) {
      console.error("No se pudo enviar WhatsApp: el cliente no está inicializado o autenticado.");
    } else {
      try {
        const normalized = normalizeNumber(whatsapp);
        const jid = normalized + "@c.us";
        console.log(`Enviando alerta de WhatsApp a: ${jid}`);
        await client.sendMessage(jid, message);
        whatsappSent = true;
        console.log(`WhatsApp enviado con éxito a: ${jid}`);
      } catch (err) {
        console.error("Error al enviar mensaje de WhatsApp:", err);
      }
    }
  }

  res.json({
    emailSent,
    whatsappSent
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    whatsappConnected: isWhatsAppReady
  });
});

// Inicializar BD primero, luego levantar servidor HTTP
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend de alertas escuchando en http://localhost:${PORT}`);
  });
});
