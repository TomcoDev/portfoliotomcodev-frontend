const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Configura tu transporte SMTP (puedes usar Gmail, Outlook, etc.)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reyesnestor673@gmail.com',
      pass: 'cxvl mgzo udwu aoqm', // Usa una contraseña de aplicación si usas Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'reyesnestor673@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      html: `<p><b>Nombre:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Mensaje:</b><br/>${message}</p>`,
    });
    res.status(200).json({ ok: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ ok: false, message: 'Error al enviar el mensaje', error });
  }
});

app.listen(3001, () => {
  console.log('Servidor backend escuchando en http://localhost:3001');
});