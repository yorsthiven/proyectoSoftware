import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function Home() {
  return (
    <div className="home">
      {/* Imagen principal */}
      <section className="hero">
        <img src="/peluqueria.png" alt="Interior peluquería" />
        <div className="whatsapp-banner">
          <h3>Ccarlos Rodríguez</h3>
          <p>Agenda tu cita ahora</p>
          <a href="https://wa.me/123456789" target="_blank" rel="noreferrer">
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>

      <section className="descripcion">
        <img src="/corte.png" alt="Corte de cabello" className="imagen-descripcion" />
        <div className="texto-descripcion">
          <h2>EL CAMBIO QUE BUSCABAS ESTÁ AQUÍ</h2>
          <p>
            En Ccarlos Rodríguez siempre estamos innovando. Por esa razón, nos enfocamos en nuevas
            tendencias que nos permiten ofrecer una gran variedad de estilos y los cambios que estás
            esperando.
            <br />
            Pelo corto versus pelo largo parece ser la tendencia que se apoderará del 2025.
            ¡Inspírate en nuestros trabajos!
          </p>
        </div>
      </section>

      {/* Productos */}
      <section className="productos" id="productos">
        <h2>NUESTROS PRODUCTOS</h2>
        <div className="lista-productos">
          <div className="producto">
            <img src="/shampoo.png" alt="Shampoo" />
            <p>SHAMPOO + QUINOA + KERATINA</p>
            <p>300ML</p>
            <p className="precio">$58.000</p>
          </div>
          <div className="producto">
            <img src="/acondicionador.png" alt="Acondicionador" />
            <p>ACONDICIONADOR + QUINOA + KERATINA</p>
            <p>300ML</p>
            <p className="precio">$62.000</p>
          </div>
          <div className="producto">
            <img src="/mascarilla.png" alt="Mascarilla" />
            <p>MASCARILLA + QUINOA + KERATINA</p>
            <p>250ML</p>
            <p className="precio">$48.000</p>
          </div>
        </div>
      <Link to="/productos" className="ver-todos">
         Ver todos los productos
      </Link>

      </section>

      <div className="m-4">
        <img src="/banner.png" alt="Banner promocional" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default Home;
