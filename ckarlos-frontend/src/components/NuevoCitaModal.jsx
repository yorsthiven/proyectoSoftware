import React, { useEffect, useState } from 'react';
import API from '../api';
import './NuevoCitaModal.css';

function NuevoCitaModal({ isOpen, onClose, onCitaCreada, fechaSeleccionada, cita }) {
const [clientes, setClientes] = useState([]);
const [estilistas, setEstilistas] = useState([]);
const [servicios, setServicios] = useState([]);
const [form, setForm] = useState({
clienteId: '',
estilistaId: '',
servicioId: '',
fecha: '',
hora: ''
});
const [mensaje, setMensaje] = useState('');

useEffect(() => {
const fetchData = async () => {
try {
const clientesRes = await API.get('/usuarios');
setClientes(clientesRes.data.filter(c => c.tipo === 'Cliente'));


    const estilistasRes = await API.get('/estilistas');
    setEstilistas(estilistasRes.data);

    const serviciosRes = await API.get('/servicios');
    setServicios(serviciosRes.data);

    if (fechaSeleccionada) {
      const formato = fechaSeleccionada.toISOString().split('T')[0];
      setForm((prev) => ({ ...prev, fecha: formato }));
    }

    if (cita) {
      setForm({
        clienteId: cita.cliente._id,
        estilistaId: cita.horarioServicio.estilista._id,
        servicioId: cita.horarioServicio.servicio._id,
        fecha: cita.horarioServicio.fecha.split('T')[0],
        hora: cita.horarioServicio.hora
      });
    }
  } catch (err) {
    setMensaje('Error cargando datos');
  }
};

if (isOpen) fetchData();
}, [isOpen, fechaSeleccionada, cita]);

const handleChange = e => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async e => {
e.preventDefault();
setMensaje('');


try {
  const horarioRes = await API.post('/horariosServicio', {
    estilista: form.estilistaId,
    servicio: form.servicioId,
    fecha: form.fecha,
    hora: form.hora
  });

  const horarioId = horarioRes.data._id;

  if (cita) {
    await API.patch('/citas', {
      id: cita._id,
      cliente: form.clienteId,
      horarioServicio: horarioId,
      confirmacionCita: cita.confirmacionCita || false
    });
  } else {
    await API.post('/citas', {
      cliente: form.clienteId,
      horarioServicio: horarioId
    });
  }

  if (typeof onCitaCreada === 'function') {
    onCitaCreada();
  }

  onClose();
} catch (error) {
  console.error('Error al crear/modificar cita:', error.response?.data || error.message);
  setMensaje(error.response?.data?.message || 'Error al procesar la cita');
}
};

if (!isOpen) return null;

const horasDisponibles = Array.from({ length: 12 }, (_, i) =>
  `${String(8 + i).padStart(2, '0')}:00`
);
// Buscar estilista seleccionado
const estilistaSeleccionado = estilistas.find(e => e._id === form.estilistaId);

return (
<div className="modal-overlay">
<div className="modal-content nueva-cita-modal">
<button className="cerrar" onClick={onClose}>×</button>
<h2>{cita ? 'Editar Cita' : 'Nueva Cita'}</h2>
<form onSubmit={handleSubmit} className="form-nueva-cita">
<select name="clienteId" value={form.clienteId} onChange={handleChange} required>
<option value="">Selecciona cliente</option>
{clientes.map(c => (
<option key={c._id} value={c._id}>{c.nombre}</option>
))}
</select>


      <select name="estilistaId" value={form.estilistaId} onChange={handleChange} required>
        <option value="">Selecciona estilista</option>
        {estilistas.map(e => (
          <option key={e._id} value={e._id}>{e.nombre}</option>
        ))}
      </select>

      {/* Mostrar especialidad */}
      {form.estilistaId && (
        <p className="info-estilista">
          <strong>Especialidad:</strong>{' '}
          {estilistaSeleccionado?.especialidad || 'No disponible'}
        </p>
      )}

      <select name="servicioId" value={form.servicioId} onChange={handleChange} required>
        <option value="">Selecciona servicio</option>
        {servicios.map(s => (
          <option key={s._id} value={s._id}>{s.nombre}</option>
        ))}
      </select>

      <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />

      <select name="hora" value={form.hora} onChange={handleChange} required>
        <option value="">Selecciona hora</option>
        {horasDisponibles.map(h => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>

      <button type="submit" className="btn-guardar-cita">
        {cita ? 'Guardar Cambios' : 'Guardar Cita'}
      </button>
      {mensaje && <p className="error">{mensaje}</p>}
    </form>
  </div>
</div>
);
}

export default NuevoCitaModal;