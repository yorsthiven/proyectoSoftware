import React from 'react';
import './Home.css'; 
import './Cabello.css';

function Cabello() {
  return (
    <div>

      <section className="descripcion">
        <img
          src="/bannerp.png"
          alt="Cabello en salón"
          className="imagen-descripcion"
        />
        <div className="texto-descripcion">
          <h2>HAZ DEL CABELLO TU MEJOR ACCESORIO DE BELLEZA</h2>
          <p>
           ÚNETE A LAS ÚLTIMAS TENDENCIAS EN 
           CORTE, COLOR Y ESTILOS CON NUESTROS ESPECIALISTAS EN CABELLO
          </p>
        </div>
      </section>

      <section className="banners-cabello">
  <img src="/banner2.png" alt="Banner 1" className="banner-img" />
  <img src="/banner1.png" alt="Banner 2" className="banner-img" />
</section>

 

    </div>
  );
}

export default Cabello;
