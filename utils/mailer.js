const nodemailer = require('nodemailer');

async function enviarCorreoRegistro(destinatario, nombreUsuario) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'crawford.wunsch@ethereal.email',
            pass: 'hcV3FmP8AuqpKeYrA1'
    }
});

// Contenido del correo
const info = await transporter.sendMail({
    from: `"Peluqueria Ckarlos Rodriguez" <no-reply@ckarlospeluqueria.com>`,
    to: destinatario,
    subject: '¡Registro exitoso!',
    text: `Hola ${nombreUsuario}, tu registro fue exitoso.`,
    html: `<h3>Hola ${nombreUsuario}</h3><p>Tu registro fue exitoso. ¡Gracias por unirte!</p>`
});

console.log('Correo enviado. ID:', info.messageId);
console.log('Puedes verlo en:', nodemailer.getTestMessageUrl(info));
}

async function enviarCorreoRegistro(destinatario, nombreUsuario) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'crawford.wunsch@ethereal.email',
            pass: 'hcV3FmP8AuqpKeYrA1'
    }
});

// Contenido del correo
const info = await transporter.sendMail({
    from: `"Peluqueria Ckarlos Rodriguez" <no-reply@ckarlospeluqueria.com>`,
    to: destinatario,
    subject: '¡Registro exitoso!',
    text: `Hola ${nombreUsuario}, tu registro fue exitoso.`,
    html: `<h3>Hola ${nombreUsuario}</h3><p>Tu registro fue exitoso. ¡Gracias por unirte!</p>`
});

console.log('Correo enviado. ID:', info.messageId);
console.log('Puedes verlo en:', nodemailer.getTestMessageUrl(info));
}

module.exports = enviarCorreoRegistro;