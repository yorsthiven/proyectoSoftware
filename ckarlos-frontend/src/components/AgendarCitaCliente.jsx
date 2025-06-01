import React, { useState, useEffect } from 'react';
import API from '../api';
import { obtenerUsuario } from '../utils/auth';
import './AgendarCitaCliente.css';

function AgendarCitaCliente() {
const [servicios, setServicios] = useState([]);
const [estilistas, setEstilistas] = useState([]);
const [form, setForm] = useState({
servicioId: '',
estilistaId: '',
fecha: '',
hora: ''
});
const [mensaje, setMensaje] = useState('');

useEffect(() => {
const fetchData = async () => {
try {
const serviciosRes = await API.get('/servicios');
const estilistasRes = await API.get('/estilistas');
setServicios(serviciosRes.data);
setEstilistas(estilistasRes.data);
} catch (err) {
setMensaje('Error cargando datos.');
console.error(err);
}
};


fetchData();
}, []);

const handleChange = e => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async e => {
e.preventDefault();
setMensaje('');


try {
  const usuario = obtenerUsuario(); // Obtener el usuario logueado
  if (!usuario || !usuario._id) {
    setMensaje('Usuario no autenticado.');
    return;
  }

  // 1. Crear horario
  const horarioRes = await API.post('/horariosServicio', {
    estilista: form.estilistaId,
    servicio: form.servicioId,
    fecha: form.fecha,
    hora: form.hora
  });

  const horarioId = horarioRes.data._id;

  // 2. Crear cita con el ID del cliente autenticado
  await API.post('/citas', {
    cliente: usuario._id,
    horarioServicio: horarioId
  });

  setMensaje('Cita agendada exitosamente');
  setForm({ servicioId: '', estilistaId: '', fecha: '', hora: '' });
} catch (err) {
  console.error(err);
  setMensaje('Error al agendar cita.');
}
};

const horasDisponibles = Array.from({ length: 12 }, (_, i) =>
  `${String(8 + i).padStart(2, '0')}:00`
);

return (
<div className="agendar-cita-container">
<h2>Agendar Cita</h2>
<form onSubmit={handleSubmit} className="form-agendar-cita">
<select name="servicioId" value={form.servicioId} onChange={handleChange} required>
<option value="">Selecciona servicio</option>
{servicios.map(s => (
<option key={s._id} value={s._id}>{s.nombre}</option>
))}
</select>


    <select name="estilistaId" value={form.estilistaId} onChange={handleChange} required>
      <option value="">Selecciona estilista</option>
      {estilistas.map(e => (
        <option key={e._id} value={e._id}>{e.nombre}</option>
      ))}
    </select>

    <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />

    <select name="hora" value={form.hora} onChange={handleChange} required>
      <option value="">Selecciona hora</option>
      {horasDisponibles.map(h => (
        <option key={h} value={h}>{h}</option>
      ))}
    </select>

    <button type="submit" className="btn-agendar">Agendar</button>
    {mensaje && <p className="mensaje">{mensaje}</p>}
  </form>
</div>
);
}

export default AgendarCitaCliente;