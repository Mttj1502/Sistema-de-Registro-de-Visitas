import nodemailer from "nodemailer";

export async function enviarCorreo({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com", // Cambia por tu servidor SMTP
    port: 587,
    secure: false,
    auth: {
      user: "usuario@example.com", // Cambia por tu usuario
      pass: "tu_contraseña" // Cambia por tu contraseña
    }
  });

  await transporter.sendMail({
    from: 'Securiti <usuario@example.com>',
    to,
    subject,
    text
  });
}
