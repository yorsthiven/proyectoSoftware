import React from 'react';
import './Unas.css';

function Unas() {
return (
<div className="unas-page">
<section className="descripcion">
<img src="/unas.png" alt="Uñas" className="imagen-descripcion" />
<div className="texto-descripcion">
<h2>NO SOLO OFRECEMOS UN SERVICIO, HACEMOS ARTE CON LAS UÑAS! </h2>
<p>
VISITANOS Y CONOCE LAS NUEVAS TENDENCIAS EN UÑAS! 
CONTAMOS CON DIFERENTES PROCEDIMIENTOSY SERVICIOS 
PARA QUE TU EXPERIENCIA SEA ÚNICA.
</p>
</div>
</section>
  <section className="banners-unas">
    <img src="/banner_unas1.png" alt="Banner 1" className="banner-img" />
    <img src="/banner_unas2.png" alt="Banner 2" className="banner-img" />
  </section>
</div>
);
}

export default Unas;