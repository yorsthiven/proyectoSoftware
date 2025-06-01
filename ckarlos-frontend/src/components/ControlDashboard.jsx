import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import API from '../api';
import NuevoClienteModal from './NuevoClienteModal';
import NuevoCitaModal from './NuevoCitaModal';
import './ControlDashboard.css';

function ControlDashboard() {
  const [citasHoy, setCitasHoy] = useState([]);
  const [clientesHoy, setClientesHoy] = useState([]);
  const [mostrarModalCliente, setMostrarModalCliente] = useState(false);
  const [mostrarModalCita, setMostrarModalCita] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const fechaActual = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const cargarDatosHoy = async () => {
    try {
      const [resCitas, resUsuarios] = await Promise.all([
        API.get('/citas'),
        API.get('/usuarios')
      ]);

      const hoy = new Date().toISOString().substring(0, 10);

      const citasFiltradas = resCitas.data.filter(cita =>
        cita.horarioServicio?.fecha?.substring(0, 10) === hoy
      );

      const clientesNuevos = resUsuarios.data.filter(
        user => user.tipo === 'Cliente' && user.fechaCreacion?.substring(0, 10) === hoy
      );

      setCitasHoy(citasFiltradas);
      setClientesHoy(clientesNuevos);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
      setMensaje('Error al cargar datos');
    }
  };

  useEffect(() => {
    cargarDatosHoy();
  }, []);

  return (
    <div className="panel-dashboard">
      <Sidebar />
      <main className="contenido-panel">
        <div className="encabezado-dashboard">
          <h2 className="titulo-dashboard">DASHBOARD</h2>
          <img src="/logob.png" alt="Logo" className="logo-dashboard" />
        </div>

        <p className="fecha-actual">{fechaActual}</p>

        <div className="botones-acciones">
          <button className="btn-nuevo verde" onClick={() => setMostrarModalCliente(true)}>
            + Nuevo Cliente
          </button>
          <button className="btn-nuevo naranja" onClick={() => setMostrarModalCita(true)}>
            + Nueva Cita
          </button>
        </div>

        <div className="resumen-metricas">
          <div className="card verde">
            <h3>Citas del día</h3>
            <p>{citasHoy.length}</p>
          </div>
          
        </div>

        <div className="tabla-proximas-citas">
          <h3>Próximas Citas de Hoy</h3>
          {citasHoy.length === 0 ? (
            <p>No hay citas para hoy</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Estilista</th>
                </tr>
              </thead>
              <tbody>
                {citasHoy.map((cita, idx) => (
                  <tr key={idx}>
                    <td>{cita.horarioServicio?.hora}</td>
                    <td>{cita.cliente?.nombre}</td>
                    <td>{cita.horarioServicio?.servicio?.nombre}</td>
                    <td>{cita.horarioServicio?.estilista?.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {mensaje && <p className="mensaje-error">{mensaje}</p>}

        {/* Modales */}
        <NuevoClienteModal
          isOpen={mostrarModalCliente}
          onClose={() => {
            setMostrarModalCliente(false);
            cargarDatosHoy(); 
          }}
          onClienteCreado={() => {
            setMensaje('Cliente creado con éxito');
            cargarDatosHoy();
          }}
        />

        <NuevoCitaModal
          isOpen={mostrarModalCita}
          onClose={() => {
            setMostrarModalCita(false);
            cargarDatosHoy(); 
          }}
          onCitaCreada={() => {
            setMensaje('Cita registrada con éxito');
            cargarDatosHoy();
          }}
        />
      </main>
    </div>
  );
}

export default ControlDashboard;
