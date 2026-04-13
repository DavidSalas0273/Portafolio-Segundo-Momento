const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

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
    if (!to) return res.status(500).json({ error: 'EMAIL_TO not configured' });

    const subject = `Nuevo mensaje desde portafolio: ${name}`;
    const text = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
    const html = `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g,'<br/>')}</p>`;

    const info = await transporter.sendMail({ from, to, subject, text, html });
    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('send-email error', err);
    return res.status(500).json({ error: 'Error sending email', details: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Email API server listening on ${port}`));
