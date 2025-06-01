import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import './ControlProductos.css';

const productosIniciales = [
  { nombre: 'Shampoo', stock: 25, precio: 12000 },
  { nombre: 'Acondicionador', stock: 12, precio: 13000 },
  { nombre: 'Crema de peinar', stock: 0, precio: 10000 },
  { nombre: 'Cepillo cabello', stock: 30, precio: 9000 },
  { nombre: 'Cepillo masajeador', stock: 8, precio: 11000 },
  { nombre: 'Moñas en seda', stock: 18, precio: 5000 },
  { nombre: 'Pinzas de cabello', stock: 0, precio: 6000 },
  { nombre: 'Ampolletas nutritivas', stock: 5, precio: 15000 },
];

function ControlProductos() {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  const productosFiltrados = useMemo(() => {
    return productosIniciales.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda]);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const productosVisibles = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const totalProductos = productosIniciales.length;
  const bajoInventario = productosIniciales.filter(p => p.stock > 0 && p.stock <= 12).length;
  const sinStock = productosIniciales.filter(p => p.stock === 0).length;

  const obtenerEstado = (stock) => {
    if (stock === 0) return 'Sin stock';
    if (stock <= 12) return 'Bajo inventario';
    return 'Normal';
  };

  const fechaActual = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="panel-productos">
      <Sidebar />
      <main className="contenido-panel">
        <div className="encabezado-dashboard">
          <h2 className="titulo-dashboard">PRODUCTOS</h2>
          <img src="/logob.png" alt="Logo" className="logo-dashboard" />
        </div>

        <p className="fecha-actual">{fechaActual}</p>

        <div className="barra-superior-productos">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
          />
          <button className="btn-buscar">Buscar</button>
        </div>

        <div className="tarjetas-productos">
          <div className="tarjeta total">
            <h3>Total de productos</h3>
            <span>{totalProductos}</span>
          </div>
          <div className="tarjeta bajo">
            <h3>Bajo inventario</h3>
            <span>{bajoInventario}</span>
          </div>
          <div className="tarjeta sin">
            <h3>Sin stock</h3>
            <span>{sinStock}</span>
          </div>
        </div>

        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {productosVisibles.map((prod, i) => (
              <tr key={i}>
                <td>{prod.nombre}</td>
                <td>{prod.stock}</td>
                <td>${prod.precio.toLocaleString()}</td>
                <td>{obtenerEstado(prod.stock)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="paginacion-productos">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              className={paginaActual === i + 1 ? 'activo' : ''}
              onClick={() => setPaginaActual(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ControlProductos;
