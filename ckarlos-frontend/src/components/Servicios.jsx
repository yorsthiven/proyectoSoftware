// src/components/Servicios.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Servicios.css';

function Servicios() {
  return (
    <div className="servicios-page">

      {/* 1. Sección descriptiva */}
      <section className="servicios-descripcion">
        <div className="bloque-imagen">
          <img src="/mujer.png" alt="mujer" />
        </div>
        <div className="texto-servicios">
          <h2>TODO LO QUE NECESITAS PARA TU CUIDADO CAPILAR</h2>
          <p>
            Un espacio diseñado para ti, amplios servicios de belleza según tu estilo y personalidad.
            Conoce aquí nuestros diferentes servicios y procedimientos con las últimas tendencias para tu
            cabello, uñas, maquillaje y cuidado corporal.
          </p>
        </div>
        <div className="bloque-imagen">
          <img src="/mujerliso.png" alt="mujerliso" />
        </div>
      </section>

      {/* 2. Título */}
      <div className="servicios-container">
        <h1>SERVICIOS</h1>
      </div>

      {/* 3. Cuadrícula estática */}
      <section className="grid-servicios">

        <div className="servicio-item">
          <Link to="/cabello">
            <img src="/cabello.png" alt="Cabello" className="img-servicio" />
          </Link>
          <p>CABELLO</p>
        </div>

        <div className="servicio-item">
          <Link to="/cejas-pestanas">
            <img src="/cejas.png" alt="Cejas y Pestañas" className="img-servicio" />
          </Link>
          <p>CEJAS Y PESTAÑAS</p>
        </div>

        <div className="servicio-item">
          <Link to="/depilacion">
            <img src="/depilacion.png" alt="Depilación" className="img-servicio" />
          </Link>
          <p>DEPILACIÓN</p>
        </div>

        <div className="servicio-item">
          <Link to="/maquillaje">
            <img src="/maquillaje.png" alt="Maquillaje" className="img-servicio" />
          </Link>
          <p>MAQUILLAJE</p>
        </div>

        <div className="servicio-item">
          <Link to="/unas">
            <img src="/unas.png" alt="Uñas" className="img-servicio" />
          </Link>
          <p>UÑAS</p>
        </div>

        <div className="servicio-item">
          <Link to="/spa">
            <img src="/spas.png" alt="Spas" className="img-servicio" />
          </Link>
          <p>SPAS</p>
        </div>

      </section>
    </div>
  );
}

export default Servicios;
