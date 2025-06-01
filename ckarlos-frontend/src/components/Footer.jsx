// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // lo crearemos en el paso 2

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <p className="footer-horario">
        Horarios de Atención: Lunes a Sábado 6:00 a.m. a 7:00 p.m. – Domingos 8:00 a.m. a 5:00 p.m. – Servicio de Parqueadero
      </p>
      <p className="footer-aviso">
        <strong>
          Para citas en horarios de 6 a.m – 8 a.m y 6 p.m – 8 p.m – Es necesario llamar y realizar reserva previa
        </strong>
      </p>
      <div className="footer-contacto">
        <div className="footer-item">
          <img src="/ubicacion.png" alt="Ubicación" className="footer-icono" />
          <p>Calle 111 #17a-28, Bogotá</p>
        </div>
        <div className="footer-item">
          <img src="/telefono.png" alt="Teléfono" className="footer-icono" />
          <p>3115672922</p>
        </div>
        <div className="footer-item">
          <img src="/correo.png" alt="Correo" className="footer-icono" />
          <p>info@ccarlospeluqueria.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
