import React from 'react';
import './CejasPestanas.css';

function CejasPestanas() {
  return (
    <div>
  

      <section className="descripcion">
        <img
          src="/cejas.png"
          alt="Cejas y Pestañas"
          className="imagen-descripcion"
        />
        <div className="texto-descripcion">
          <h2>RESALTA LA BELLEZA NATURAL DE TU MIRADA</h2>
          <p>
           DALE A TU ROSTRO UN ÉSTILO MÁS GLAMUROSO Y 
           EXPLORA LAS MEJORES OPCIONES PARA RESALTAR TUS RASGOS Y LUCIR AÚN MÁS BELLA.
          </p>
        </div>
      </section>

      <section className="banners-cejas">
        <img src="/banner_cejas1.png" alt="Banner 1" className="banner-img" />
        <img src="/banner_cejas2.png" alt="Banner 2" className="banner-img" />
      </section>
    </div>
  );
}

export default CejasPestanas;
