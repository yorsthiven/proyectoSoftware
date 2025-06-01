import React from 'react';
import './Spa.css';

function Spa() {
return (
<div className="spa-page">


  {/* Sección de descripción con imagen y texto */}
  <section className="descripcion">
    <img
      src="/spas.png"
      alt="Spa"
      className="imagen-descripcion"
    />
    <div className="texto-descripcion">
      <h2>BIENESTAR Y RELAJACIÓN EN NUESTRO SPA</h2>
      <p>
        Disfruta de tratamientos diseñados para relajar tu cuerpo y mente:
        masajes, terapias faciales, limpieza profunda y mucho más.
      </p>
    </div>
  </section>

  {/* Sección de servicios del spa en cuadrícula 2x2 */}
  <section className="spa-servicios-grid">

    <div className="spa-item">
      <h3 className="titulo-spa">SPA CAPILAR</h3>
      <img src="/capilar.png" alt="capilar" />
    </div>

    <div className="spa-item">
      <h3 className="titulo-spa">RITUALES EXCLUSIVOS</h3>
      <img src="/ritual.png" alt="ritual" />
    </div>

    <div className="spa-item">
      <h3 className="titulo-spa">RELAJACION CORPORAL</h3>
      <img src="/corporal.png" alt="Corporal" />
    </div>

    <div className="spa-item">
      <h3 className="titulo-spa">LIMPIEZA FACIAL</h3>
      <img src="/facial.png" alt="facial" />
    </div>

  </section>
</div>
);
}

export default Spa;