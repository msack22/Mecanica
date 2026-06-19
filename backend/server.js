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
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
const WHATSAPP_DATA_PATH = "/Users/matiassack/Documents/Matias/whatsapp-session";
const WHATSAPP_CLIENT_ID = "mecanica-backend";
const WHATSAPP_USER_DATA_DIR = path.join(WHATSAPP_DATA_PATH, `session-${WHATSAPP_CLIENT_ID}`);
const JWT_SECRET = process.env.SECRET_KEY || process.env.JWT_SECRET || 'mecanica_secret_key_repaso_321';

// Conexión y Pool de MySQL
let pool;

async function initializeDatabase() {
  const dbUrl = process.env.DATABASE_URL || `mysql://${process.env.DB_USER || 'root'}:${process.env.DB_PASSWORD || ''}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '3306'}/${process.env.DB_NAME || 'mecanica'}`;
  
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

    // 3. Crear tabla users si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Crear tabla cars si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        alias VARCHAR(255) NOT NULL,
        brand VARCHAR(100) DEFAULT 'Volkswagen',
        model VARCHAR(100) DEFAULT 'Gol Trend',
        year INT DEFAULT 2015,
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
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log("✅ Tablas users y cars inicializadas en MySQL.");
  } catch (err) {
    console.error("❌ Fallo al inicializar base de datos MySQL:", err);
    process.exit(1);
  }
}

// Middleware de Autenticación mediante JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Se requiere iniciar sesión.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Sesión expirada o inválida. Vuelve a iniciar sesión.' });
    }
    req.user = decoded;
    next();
  });
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

// =======================================================================
// RUTAS DE AUTENTICACIÓN
// =======================================================================

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Se requiere correo electrónico y contraseña.' });
  }

  try {
    // Verificar si el usuario ya existe
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const [userResult] = await pool.query(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name || '']
    );

    const userId = userResult.insertId;

    // Crear auto inicial predeterminado para el nuevo usuario
    await pool.query(
      'INSERT INTO cars (user_id, alias) VALUES (?, ?)',
      [userId, 'Gol Trend (Mi Auto)']
    );

    // Generar JWT
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      token,
      user: { id: userId, email, name: name || '' }
    });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ error: 'Fallo al registrar el usuario en la base de datos.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Se requiere correo electrónico y contraseña.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: 'Fallo al iniciar sesión.' });
  }
});

app.post('/api/auth/google-login', async (req, res) => {
  const { email, name, idToken } = req.body;
  
  let targetEmail = email;
  let targetName = name;

  if (idToken) {
    try {
      // Validar token de Google Identity Services llamando al endpoint público de Google
      const tokenRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
      if (!tokenRes.ok) {
        return res.status(400).json({ error: 'El token de Google es inválido o ha expirado.' });
      }
      
      const payload = await tokenRes.json();
      
      // Validar la audiencia del token para evitar ataques de suplantación de ID Token
      if (payload.aud && payload.aud !== process.env.GOOGLE_CLIENT_ID) {
        return res.status(400).json({ error: 'La audiencia del token de Google no coincide con esta aplicación.' });
      }

      targetEmail = payload.email;
      targetName = payload.name || payload.given_name || '';

      if (!targetEmail) {
        return res.status(400).json({ error: 'El token de Google no contiene un correo electrónico válido.' });
      }
    } catch (verifyErr) {
      console.error("Error validando token con Google:", verifyErr);
      return res.status(500).json({ error: 'Error interno de comunicación al verificar con Google.' });
    }
  }

  if (!targetEmail) {
    return res.status(400).json({ error: 'Se requiere el correo de Google o un token de identidad válido.' });
  }

  try {
    // 1. Verificar si el usuario ya existe en MySQL
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [targetEmail]);
    
    let user;
    if (rows.length === 0) {
      // 2. Si no existe, crear un nuevo usuario con contraseña aleatoria
      const salt = await bcrypt.genSalt(10);
      const randomPassword = Math.random().toString(36).slice(-10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      const [userResult] = await pool.query(
        'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
        [targetEmail, hashedPassword, targetName || '']
      );

      const userId = userResult.insertId;

      // Crear auto inicial predeterminado para el nuevo usuario
      await pool.query(
        'INSERT INTO cars (user_id, alias) VALUES (?, ?)',
        [userId, 'Gol Trend (Mi Auto)']
      );

      user = { id: userId, email: targetEmail, name: targetName || '' };
    } else {
      user = rows[0];
    }

    // 3. Generar token de sesión JWT local de la app
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error("Error en Google login:", err);
    res.status(500).json({ error: 'Fallo al autenticar con Google en la base de datos.' });
  }
});

// =======================================================================
// RUTAS DE GESTIÓN DE AUTOS (CRUD AUTENTICADO)
// =======================================================================

app.get('/api/cars', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cars WHERE user_id = ? ORDER BY id ASC', [req.user.userId]);
    // Mapear booleanos
    const carsMapped = rows.map(car => ({
      ...car,
      enableEmail: !!car.enableEmail,
      enableWhatsapp: !!car.enableWhatsapp
    }));
    res.json(carsMapped);
  } catch (err) {
    console.error("Error al obtener autos:", err);
    res.status(500).json({ error: 'Fallo al recuperar los autos de la base de datos.' });
  }
});

app.post('/api/cars', authenticateToken, async (req, res) => {
  const { alias, brand, model, year, kmActual, kmAnual, email, whatsapp, enableEmail, enableWhatsapp } = req.body;
  if (!alias) {
    return res.status(400).json({ error: 'El alias del auto es requerido.' });
  }

  try {
    const normalizedWhatsapp = whatsapp ? normalizeNumber(whatsapp) : '';
    const [result] = await pool.query(`
      INSERT INTO cars (
        user_id, alias, brand, model, year, kmActual, kmAnual, 
        email, whatsapp, enableEmail, enableWhatsapp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      req.user.userId,
      alias,
      brand || 'Volkswagen',
      model || 'Gol Trend',
      year || 2015,
      kmActual || 90000,
      kmAnual || 12000,
      email || '',
      normalizedWhatsapp,
      enableEmail ? 1 : 0,
      enableWhatsapp ? 1 : 0
    ]);

    const [newCarRows] = await pool.query('SELECT * FROM cars WHERE id = ?', [result.insertId]);
    const newCar = newCarRows[0];
    newCar.enableEmail = !!newCar.enableEmail;
    newCar.enableWhatsapp = !!newCar.enableWhatsapp;
    
    res.status(201).json(newCar);
  } catch (err) {
    console.error("Error al crear auto:", err);
    res.status(500).json({ error: 'Fallo al registrar el auto.' });
  }
});

app.put('/api/cars/:id', authenticateToken, async (req, res) => {
  const carId = req.params.id;
  const {
    alias, brand, model, year, kmActual, kmAnual, email, whatsapp, enableEmail, enableWhatsapp,
    aceiteDate, aceiteKm, bujiasDate, bujiasKm, frenosDate,
    correaDate, correaKm, refrigeranteDate, refrigeranteKm, lastAlertSentDate
  } = req.body;

  try {
    // Validar propiedad del auto
    const [existing] = await pool.query('SELECT id FROM cars WHERE id = ? AND user_id = ?', [carId, req.user.userId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado o acceso denegado.' });
    }

    const normalizedWhatsapp = whatsapp ? normalizeNumber(whatsapp) : '';
    await pool.query(`
      UPDATE cars SET 
        alias = ?, brand = ?, model = ?, year = ?, kmActual = ?, kmAnual = ?, 
        email = ?, whatsapp = ?, enableEmail = ?, enableWhatsapp = ?, 
        aceiteDate = ?, aceiteKm = ?, bujiasDate = ?, bujiasKm = ?, 
        frenosDate = ?, correaDate = ?, correaKm = ?, refrigeranteDate = ?, 
        refrigeranteKm = ?, lastAlertSentDate = ?
      WHERE id = ? AND user_id = ?
    `, [
      alias, brand, model, year, kmActual, kmAnual, 
      email, normalizedWhatsapp, enableEmail ? 1 : 0, enableWhatsapp ? 1 : 0, 
      aceiteDate, aceiteKm, bujiasDate, bujiasKm, 
      frenosDate, correaDate, correaKm, refrigeranteDate, 
      refrigeranteKm, lastAlertSentDate || null,
      carId, req.user.userId
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error("Error al actualizar auto:", err);
    res.status(500).json({ error: 'Fallo al guardar la configuración del auto.' });
  }
});

app.delete('/api/cars/:id', authenticateToken, async (req, res) => {
  const carId = req.params.id;
  try {
    const [existing] = await pool.query('SELECT id FROM cars WHERE id = ? AND user_id = ?', [carId, req.user.userId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado o acceso denegado.' });
    }

    await pool.query('DELETE FROM cars WHERE id = ? AND user_id = ?', [carId, req.user.userId]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error al eliminar auto:", err);
    res.status(500).json({ error: 'Fallo al eliminar el auto.' });
  }
});

// Endpoint POST para disparar notificaciones
app.post('/api/send-alert', async (req, res) => {
  const { email, whatsapp, title, message, html, carId } = req.body;
  
  if (!email && !whatsapp) {
    return res.status(400).json({ error: 'Se requiere al menos un correo o un número de WhatsApp.' });
  }

  let emailSent = false;
  let whatsappSent = false;

  // 1. Procesar Envío por Email
  if (email) {
    console.log(`[EMAIL] Iniciando envío de alerta por email a: ${email}`);
    emailSent = await sendViaBrevo(email, title, html || message);
    
    if (emailSent) {
      console.log(`[EMAIL] Alerta enviada con éxito vía Brevo a: ${email}`);
    } else {
      console.warn(`[EMAIL] Falló envío vía Brevo a: ${email}. Intentando reintento vía SendGrid...`);
      emailSent = await sendViaSendGrid(email, title, html || message);
      
      if (emailSent) {
        console.log(`[EMAIL] Alerta enviada con éxito vía SendGrid a: ${email}`);
      } else {
        console.error(`[EMAIL] ERROR CRÍTICO: No se pudo enviar el correo a ${email} con ningún proveedor (Brevo/SendGrid). Verifica las API keys y límites.`);
      }
    }
  } else {
    console.log(`[EMAIL] No se solicitó envío por Email (canal deshabilitado o sin dirección).`);
  }

  // 2. Procesar Envío por WhatsApp
  if (whatsapp) {
    if (!isWhatsAppReady) {
      console.error(`[WHATSAPP] ERROR: No se pudo enviar el mensaje a ${whatsapp} porque el cliente de WhatsApp Web no está listo/autenticado.`);
    } else {
      try {
        const normalized = normalizeNumber(whatsapp);
        const jid = normalized + "@c.us";
        console.log(`[WHATSAPP] Enviando mensaje de WhatsApp a: ${jid}`);
        await client.sendMessage(jid, message);
        whatsappSent = true;
        console.log(`[WHATSAPP] Mensaje enviado con éxito a: ${jid}`);
      } catch (err) {
        console.error(`[WHATSAPP] ERROR al enviar mensaje de WhatsApp a ${whatsapp}:`, err);
      }
    }
  } else {
    console.log(`[WHATSAPP] No se solicitó envío por WhatsApp (canal deshabilitado o sin número).`);
  }

  // Si se envió con éxito y se provee carId, actualizar fecha de última alerta en MySQL
  if ((emailSent || whatsappSent) && carId) {
    try {
      const todayStr = new Date().toDateString();
      await pool.query('UPDATE cars SET lastAlertSentDate = ? WHERE id = ?', [todayStr, carId]);
      console.log(`Fecha de alerta actualizada en MySQL para el auto ${carId}: ${todayStr}`);
    } catch (err) {
      console.error("Error al actualizar la fecha de alerta en MySQL:", err);
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
    console.log(`🚀 Servidor backend de alertas y usuarios escuchando en http://localhost:${PORT}`);
  });
});
