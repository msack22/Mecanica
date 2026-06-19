import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import whatsAppPkg from 'whatsapp-web.js';
const { Client, LocalAuth } = whatsAppPkg;
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;
const WHATSAPP_DATA_PATH = "/Users/matiassack/Documents/Matias/whatsapp-session";
const WHATSAPP_CLIENT_ID = "mecanica-backend";
const WHATSAPP_USER_DATA_DIR = path.join(WHATSAPP_DATA_PATH, `session-${WHATSAPP_CLIENT_ID}`);

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend de alertas escuchando en http://localhost:${PORT}`);
});
