// backend-nodejs/src/services/emailService.js
const nodemailer = require('nodemailer');

/**
 * Crée un transporteur SMTP à partir des variables d'environnement.
 * Compatible avec : Gmail, Brevo/Sendinblue, Resend, Mailgun, OVH, SMTP personnalisé.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null; // SMTP non configuré
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true pour le port 465, false pour 587 ou 25
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Envoie un email individuel ou groupé directement depuis le serveur backend.
 */
async function sendEmail({ to, subject, html, text, attachments = [] }) {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn('[EmailService] SMTP non configuré dans le fichier .env (SMTP_HOST, SMTP_USER, SMTP_PASS)');
    return {
      sent: false,
      reason: 'SMTP_NOT_CONFIGURED',
      message: 'Serveur SMTP non configuré. Les identifiants SMTP doivent être ajoutés dans le .env.'
    };
  }

  try {
    const fromAddress = process.env.SMTP_FROM || `AI Builder Academy CI <${process.env.SMTP_USER}>`;

    const mailOptions = {
      from: fromAddress,
      to,
      subject,
      text,
      html: html || text.replace(/\n/g, '<br>'),
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Email envoyé à ${to} (MessageID: ${info.messageId})`);

    return {
      sent: true,
      messageId: info.messageId
    };
  } catch (err) {
    console.error(`[EmailService Error] Échec de l'envoi à ${to}:`, err.message);
    return {
      sent: false,
      error: err.message
    };
  }
}

module.exports = {
  sendEmail,
  isSmtpConfigured: () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
};
