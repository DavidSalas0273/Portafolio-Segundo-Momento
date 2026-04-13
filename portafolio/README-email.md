Email API
=========

He añadido dos formas de exponer una API que envía emails desde el formulario de contacto:

- `api/send-email.js` — función serverless preparada para Vercel (coloca las variables de entorno en el dashboard de Vercel).
- `server/index.js` — servidor Express local si prefieres ejecutar la API en tu propio host.

Variables de entorno (copia `.env.example` a `.env` o configúralas en Vercel):

- SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
- EMAIL_TO (correo destino)
- EMAIL_FROM (opcional)

Ejemplo de consumo desde el front-end (fetch desde el formulario):

```javascript
async function sendContact(payload) {
  // si despliegas en Vercel, apunta a /api/send-email
  // si usas el servidor local, apunta a http://tu-dominio:3000/send-email
  const endpoint = '/api/send-email';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

// payload: { name, email, message }
```

Seguridad y recomendaciones:
- No guardes credenciales en el repositorio. Usa variables de entorno.
- Para producción, recomiendo usar servicios como SendGrid, Mailgun o Amazon SES y sus SDKs — Nodemailer con SMTP funciona bien pero puede llegar a límites de envío si usas proveedores genéricos.
- Si publicas en GitHub, añade `.env` a `.gitignore` (no lo he añadido automáticamente aquí).
