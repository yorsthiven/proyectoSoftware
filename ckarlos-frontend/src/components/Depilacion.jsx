// src/components/Depilacion.jsx
import React from 'react';
import './Depilacion.css';

function Depilacion() {
  return (
    <div className="depilacion-page">
      <section className="descripcion">
        <img
          src="/depilacion.png"
          alt="Depilación"
          className="imagen-descripcion"
        />
        <div className="texto-descripcion">
          <h2>REGALA A TU PIEL BELLEZA, FRESCURA Y VITALIDAD</h2>
          <p>
           PROCEDIMIENTOS REALIZADOS CON ESPECIALISTAS PARA CUBRIR 
           LAS NECESIDADES DE TU CUERPO CUIDANDO A LA VEZ TU PIEL Y ESPACIOS CORPORALES.
          </p>
        </div>
      </section>

      <section className="banners-depilacion">
        <img src="/banner_depilacion1.png" alt="Banner 1" className="banner-img" />
        <img src="/banner_depilacion2.png" alt="Banner 2" className="banner-img" />
      </section>
    </div>
  );
}

export default Depilacion;
