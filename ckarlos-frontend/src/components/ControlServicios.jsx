import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ControlServicios.css';
import NuevoServicioModal from './NuevoServicioModal';
import API from '../api';

function ControlServicios() {
const [servicios, setServicios] = useState([]);
const [busqueda, setBusqueda] = useState('');
const [paginaActual, setPaginaActual] = useState(1);
const [serviciosPorPagina] = useState(5);
const [mostrarModal, setMostrarModal] = useState(false);

const fechaActual = new Date().toLocaleDateString('es-CO', {
weekday: 'long',
year: 'numeric',
month: 'long',
day: 'numeric',
});

const fetchServicios = async () => {
try {
const { data } = await API.get('/servicios');
setServicios(data);
} catch (err) {
console.error('Error al obtener servicios:', err);
}
};

useEffect(() => {
fetchServicios();
}, []);

const handleNuevoServicio = () => {
setMostrarModal(true);
};

// Búsqueda en vivo
const serviciosFiltrados = servicios.filter((servicio) =>
servicio.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

const indexUltimo = paginaActual * serviciosPorPagina;
const indexPrimero = indexUltimo - serviciosPorPagina;
const serviciosVisibles = serviciosFiltrados.slice(indexPrimero, indexUltimo);
const totalPaginas = Math.ceil(serviciosFiltrados.length / serviciosPorPagina);

const cambiarPagina = (nuevaPagina) => {
setPaginaActual(nuevaPagina);
};

return (
<div className="panel-servicios">
<Sidebar />
<main className="contenido-panel">
<div className="encabezado-dashboard">
<h2 className="titulo-dashboard">SERVICIOS</h2>
<img src="/logob.png" alt="Logo" className="logo-dashboard" />
</div>

    <p className="fecha-actual">{fechaActual}</p>


    <div className="acciones-servicios">
      <button className="btn-nuevo" onClick={handleNuevoServicio}>+ Nuevo Servicio</button>
      <input
        type="text"
        placeholder="Buscar servicio..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
      />
    </div>

    <table className="tabla-servicios">
      <thead>
        <tr>
          <th>Servicio</th>
          <th>Precio</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {serviciosVisibles.map((servicio, index) => (
          <tr key={index}>
            <td>{servicio.nombre}</td>
            <td>${servicio.costo.toLocaleString()}</td>
            <td>{servicio.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="paginacion-servicios">
      {[...Array(totalPaginas)].map((_, i) => (
        <button
          key={i}
          className={paginaActual === i + 1 ? 'activo' : ''}
          onClick={() => cambiarPagina(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>

    <NuevoServicioModal
      isOpen={mostrarModal}
      onClose={() => setMostrarModal(false)}
      onServicioCreado={fetchServicios}
    />
  </main>
</div>
);
}

export default ControlServicios;