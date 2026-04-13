const nodemailer = require('nodemailer');

/**
 * Vercel Serverless function to send email via SMTP (Nodemailer).
 * Expects a POST with JSON: { name, email, message }
 * Environment variables required:
 *  - SMTP_HOST
 *  - SMTP_PORT
 *  - SMTP_SECURE (true|false)
 *  - SMTP_USER
 *  - SMTP_PASS
 *  - EMAIL_TO (destination)
 *  - EMAIL_FROM (optional, defaults to SMTP_USER)
 */

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: (process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
    const to = process.env.EMAIL_TO;
    if (!to) {
      res.status(500).json({ error: 'EMAIL_TO not configured' });
      return;
    }

    const subject = `Nuevo mensaje desde portafolio: ${name}`;
    const text = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
    const html = `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g,'<br/>')}</p>`;

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('send-email error:', err);
    return res.status(500).json({ error: 'Error sending message', details: err.message });
  }
};
