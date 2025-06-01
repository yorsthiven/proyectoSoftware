import React, { useState } from 'react';
import './Productos.css';

const productosData = [
  {
    id: 1,
    nombre: 'SHAMPOO + QUINOA + KERATINA',
    imagen: '/shampoo.png',
    volumen: '300ML',
    precio: 58000,
  },
  {
    id: 2,
    nombre: 'ACONDICIONADOR + QUINOA + KERATINA',
    imagen: '/acondicionador.png',
    volumen: '300ML',
    precio: 62000,
  },
  {
    id: 3,
    nombre: 'MASCARILLA + QUINOA + KERATINA',
    imagen: '/mascarilla.png',
    volumen: '250ML',
    precio: 48000,
  },
  {
    id: 4,
    nombre: 'CREMA DE PEINAR + QUINOA + KERATINA',
    imagen: '/crema.png',
    volumen: '120ML',
    precio: 39000,
  },
  {
    id: 5,
    nombre: 'AMPOLLETAS NUTRITIVAS',
    imagen: '/ampolletas.png',
    volumen: '10ML',
    precio: 25000,
  },
  {
    id: 6,
    nombre: 'CEPILLO MASAJES',
    imagen: '/masajeador.png',
    precio: 20000,
  },
  {
    id: 7,
    nombre: 'CEPILLO ',
    imagen: '/cepillo.png',
    precio: 18000,
  },
  {
    id: 8,
    nombre: 'MOÑAS EN SEDA',
    imagen: '/monas.png',
    precio: 10000,
  },
  {
    id: 9,
    nombre: 'PINZAS DE CABELLO',
    imagen: '/pinzas.png',
    precio: 12000,
  },
];

function Productos() {
  const [carrito, setCarrito] = useState({});

  const incrementar = (id) => {
    setCarrito((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementar = (id) => {
    setCarrito((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAgregarAlCarrito = (producto) => {
    const cantidad = carrito[producto.id] || 0;
    if (cantidad > 0) {
      alert(`Agregado ${cantidad} ${producto.nombre} al carrito`);
    } else {
      alert('Selecciona una cantidad mayor a 0');
    }
  };

  const calcularTotal = () => {
    return productosData.reduce((acc, prod) => {
      const cantidad = carrito[prod.id] || 0;
      return acc + cantidad * prod.precio;
    }, 0);
  };

  return (
    <div className="productos-page">
      <h1 className="titulo-productos">PRODUCTOS CCARLOS RODRIGUEZ</h1>
      <section className="grid-productos">
        {productosData.map((producto) => (
          <div className="producto" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} className="producto-img" />
            <p className="nombre-producto">{producto.nombre}</p>
            {producto.volumen && <p>{producto.volumen}</p>}
            <p className="precio">${producto.precio.toLocaleString()}</p>

            <div className="contador">
              <button
                className="btn-cantidad"
                onClick={() => decrementar(producto.id)}
                disabled={!carrito[producto.id]}
              >
                –
              </button>
              <span className="cantidad">{carrito[producto.id] || 0}</span>
              <button className="btn-cantidad" onClick={() => incrementar(producto.id)}>
                +
              </button>
            </div>

            <button className="btn-agregar" onClick={() => handleAgregarAlCarrito(producto)}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </section>

      {/* Total */}
      <div className="total-compra">
        <h2>Total: ${calcularTotal().toLocaleString()}</h2>
      </div>
    </div>
  );
}

export default Productos;
