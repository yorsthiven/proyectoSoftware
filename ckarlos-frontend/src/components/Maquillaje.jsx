import React from 'react';
import './Maquillaje.css';

function Maquillaje() {
return (
<div className="maquillaje-page">
<section className="descripcion">
<img src="/maquillaje.png" alt="Maquillaje" className="imagen-descripcion" />
<div className="texto-descripcion">
<h2>EL ARTE DE RESALTAR AÚN MÁS LA BELLEZA DE TU ROSTRO</h2>
<p>
NO IMPORTA, LA OCASIÓN, NUESTROS ESPECIALISTAS EN MAQUILLAJE CUENTAN CON CONOCIMIENTOS 
PROFESIONALES DE ULTIMAS TENDENCIAS QUE RESALTARAN TUS RASCOS Y TE HARAN BRILLAR A DONDE
VAYAS
</p>
</div>
</section>

  <section className="banners-maquillaje">
    <img src="/banner_maquillaje1.png" alt="Banner 1" className="banner-img" />
    <img src="/banner_maquillaje2.png" alt="Banner 2" className="banner-img" />
  </section>
</div>
);
}
export default Maquillaje;
