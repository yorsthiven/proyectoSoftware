import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ControlCitas.css';
import API from '../api';
import NuevoCitaModal from './NuevoCitaModal';
import { FaPlus, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';

function ControlCitas() {
const [busqueda, setBusqueda] = useState('');
const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
const [citasDelDia, setCitasDelDia] = useState([]);
const [estilistas, setEstilistas] = useState([]);
const [mostrarModalCita, setMostrarModalCita] = useState(false);
const [mensajeExito, setMensajeExito] = useState('');
const [modoEdicion, setModoEdicion] = useState(false);
const [citaSeleccionada, setCitaSeleccionada] = useState(null);
const horas = Array.from({ length: 12 }, (_, i) => `${String(8 + i).padStart(2, '0')}:00`);


const formatFecha = (date) => date.toISOString().split('T')[0];
const primerDiaMes = () => new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), 1).getDay();
const getDiasEnMes = (anio, mes) => new Date(anio, mes + 1, 0).getDate();

const fetchCitas = async () => {
try {
const { data } = await API.get('/citas');
const fechaStr = formatFecha(fechaSeleccionada);
const filtradas = data.filter(cita => {
const fechaCita = new Date(cita.horarioServicio?.fecha).toISOString().split('T')[0];
return fechaCita === fechaStr;
});
setCitasDelDia(filtradas);
} catch (error) {
console.error('Error al obtener citas:', error);
}
};

useEffect(() => {
const fetchEstilistas = async () => {
try {
const { data } = await API.get('/estilistas');
setEstilistas(data);
} catch (err) {
console.error('Error al obtener estilistas:', err);
}
};
fetchEstilistas();
}, []);

useEffect(() => {
fetchCitas();
}, [fechaSeleccionada]);

const cambiarDia = (dias) => {
const nuevaFecha = new Date(fechaSeleccionada);
nuevaFecha.setDate(nuevaFecha.getDate() + dias);
setFechaSeleccionada(nuevaFecha);
};

const abrirModalEdicion = () => {
if (!citaSeleccionada) return alert('Selecciona una cita para editar.');
setModoEdicion(true);
setMostrarModalCita(true);
};

const cancelarCita = async () => {
if (!citaSeleccionada) return alert('Selecciona una cita para cancelar.');
if (!window.confirm('¿Estás seguro de cancelar esta cita?')) return;
try {
await API.delete('/citas', { data: { id: citaSeleccionada._id } });
setMensajeExito('❌ Cita cancelada');
setCitaSeleccionada(null);
fetchCitas();
} catch (err) {
console.error('Error al cancelar cita:', err);
}
};

const confirmarCita = async () => {
if (!citaSeleccionada) return alert('Selecciona una cita para confirmar.');
try {
await API.patch('/citas', {
id: citaSeleccionada._id,
cliente: citaSeleccionada.cliente._id,
horarioServicio: citaSeleccionada.horarioServicio._id,
confirmacionCita: true
});
setMensajeExito('✅ Cita confirmada');
fetchCitas();
} catch (err) {
console.error('Error al confirmar cita:', err);
}
};

const citasFiltradas = citasDelDia.filter(cita =>
cita.cliente?.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

return (
<div className="panel-citas">
<Sidebar />
<main className="contenido-panel">
<div className="encabezado-dashboard">
<h2 className="titulo-dashboard">CITAS</h2>
<img src="/logob.png" alt="Logo" className="logo-dashboard" />
</div>

    <div className="barra-superior-citas">
      <input
        type="text"
        placeholder="Buscar cliente"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className="btn-buscar">Buscar</button>
    </div>

    <div className="calendario-mes">
      <button className="flecha" onClick={() => cambiarDia(-1)}>&lt;</button>
      <span className="mes-actual">
        {fechaSeleccionada.toLocaleDateString('es-CO', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        })}
      </span>
      <button className="flecha" onClick={() => cambiarDia(1)}>&gt;</button>
    </div>

    {/* Calendario mensual visual */}
    <div className="calendario-mensual">
      <div className="dias-semana">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia, idx) => (
          <div key={idx} className="dia-semana">{dia}</div>
        ))}
      </div>
      <div className="grid-dias">
        {Array.from({
          length: getDiasEnMes(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth()) + primerDiaMes()
        }, (_, i) => {
          const dia = i - primerDiaMes() + 1;
          const esDiaValido = i >= primerDiaMes();
          return (
            <div
              key={i}
              className={`celda-dia ${esDiaValido ? '' : 'vacio'} ${
                esDiaValido &&
                dia === fechaSeleccionada.getDate() &&
                fechaSeleccionada.getMonth() === new Date().getMonth() &&
                fechaSeleccionada.getFullYear() === new Date().getFullYear()
                  ? 'seleccionado'
                  : ''
              }`}
              onClick={() => {
                if (esDiaValido) {
                  const nuevaFecha = new Date(
                    fechaSeleccionada.getFullYear(),
                    fechaSeleccionada.getMonth(),
                    dia
                  );
                  setFechaSeleccionada(nuevaFecha);
                }
              }}
            >
              {esDiaValido ? dia : ''}
            </div>
          );
        })}
      </div>
    </div>

    <div className="btn-hoy-container">
      <button className="btn-hoy" onClick={() => setFechaSeleccionada(new Date())}>Hoy</button>
    </div>

    <div className="agenda-dia">
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            {estilistas.map((e) => <th key={e._id}>{e.nombre}</th>)}
          </tr>
        </thead>
        <tbody>
          {horas.map(hora => (
            <tr key={hora}>
              <td>{hora}</td>
              {estilistas.map((estilista) => {
                const cita = citasFiltradas.find(c =>
                  c.horarioServicio?.hora === hora &&
                  c.horarioServicio?.estilista?._id === estilista._id
                );

                return (
                  <td
                    key={estilista._id}
                    onClick={() => setCitaSeleccionada(cita)}
                    style={{
                      backgroundColor: cita?._id === citaSeleccionada?._id ? '#eee' : cita?.confirmacionCita ? '#d4f8d4' : '#fff',
                      cursor: cita ? 'pointer' : 'default'
                    }}
                  >
                    {cita ? (
                      <>
                        <strong>{cita.cliente?.nombre}</strong>
                        <br />
                        <small>{cita.horarioServicio?.servicio?.nombre}</small>
                        <br />
                        {cita.confirmacionCita
                          ? <span style={{ color: 'green' }}>✔ Confirmada</span>
                          : <span style={{ color: 'gray' }}>🕒 Pendiente</span>}
                      </>
                    ) : (
                      <span>Disponible</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="acciones-cita">
      <button onClick={() => {
        setModoEdicion(false);
        setCitaSeleccionada(null);
        setMostrarModalCita(true);
      }}>
        <FaPlus style={{ marginRight: '6px' }} />
        Nueva Cita
      </button>

      <button onClick={abrirModalEdicion}>
        <FaEdit style={{ marginRight: '6px' }} />
        Editar Cita
      </button>

      <button onClick={cancelarCita}>
        <FaTimes style={{ marginRight: '6px' }} />
        Cancelar Cita
      </button>

      <button onClick={confirmarCita}>
        <FaCheck style={{ marginRight: '6px' }} />
        Confirmar Cita
      </button>
    </div>

    <NuevoCitaModal
      isOpen={mostrarModalCita}
      onClose={() => {
        setMostrarModalCita(false);
        setModoEdicion(false);
        setCitaSeleccionada(null);
      }}
      onCitaCreada={() => {
        setMensajeExito('✅ Cita guardada correctamente');
        fetchCitas();
        setTimeout(() => setMensajeExito(''), 3000);
      }}
      fechaSeleccionada={fechaSeleccionada}
      cita={modoEdicion ? citaSeleccionada : null}
    />

    {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
  </main>
</div>
);
}

export default ControlCitas;