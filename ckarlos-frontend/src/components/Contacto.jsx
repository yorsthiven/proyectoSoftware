import React from 'react';
import './Contacto.css';

function Contacto() {
  return (
    <div className="contacto-page">
   
      <div className="banner-contacto">
        <img src="/banner.png" alt="Banner promocional" className="contacto-banner-img" />

      </div>

   
      <h2 className="titulo-contacto">ESCRÍBENOS</h2>

   
      <form className="formulario-contacto">
        <div className="campo-form">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" required />
        </div>
        <div className="campo-form">
          <label htmlFor="telefono">Teléfono</label>
          <input type="tel" id="telefono" name="telefono" required />
        </div>
        <div className="campo-form">
          <label htmlFor="correo">Correo</label>
          <input type="email" id="correo" name="correo" required />
        </div>
        <div className="campo-form">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
        </div>
        <button type="submit" className="btn-enviar">Enviar</button>
      </form>

     
      <div className="mapa-container">
        <h3 className="mapa-titulo">¿Dónde estamos ubicados?</h3>
        <p className="direccion">Calle 111 #17a-28, Bogotá</p>
        <iframe
          title="Mapa ubicación peluquería"
          src="https://www.google.com/maps?q=Calle+111+%2317a-28,+Bogotá&output=embed"
          className="mapa"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contacto;
