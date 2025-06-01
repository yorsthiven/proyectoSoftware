import React, { useState } from 'react';
import './NuevoServicioModal.css';
import API from '../api'; // Asegúrate de tener este archivo configurado

function NuevoServicioModal({ isOpen, onClose, onServicioCreado }) {
const [nombre, setNombre] = useState('');
const [costo, setCosto] = useState('');
const [descripcion, setDescripcion] = useState('');

const limpiarFormulario = () => {
setNombre('');
setCosto('');
setDescripcion('');
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!nombre || !costo || !descripcion) {
  alert('Completa todos los campos');
  return;
}

try {
  const response = await API.post('/servicios', {
    nombre,
    costo: parseFloat(costo),
    descripcion
  });

  if (response.status === 201 || response.status === 200) {
    onServicioCreado();
    limpiarFormulario();
    onClose();
  } else {
    alert('❌ Error al crear servicio (respuesta no OK)');
  }
} catch (error) {
  console.error('Error al enviar servicio:', error);
  alert('❌ Error de red al crear servicio');
}
};

if (!isOpen) return null;

return (
<div className="modal-servicio">
<div className="modal-servicio-contenido">
<button className="btn-cerrar-x" onClick={() => {
limpiarFormulario();
onClose();
}}>
×
</button>
<h2>Nuevo Servicio</h2>
<form onSubmit={handleSubmit}>
<div>
<label>Nombre del Servicio:</label>
<input
type="text"
value={nombre}
onChange={(e) => setNombre(e.target.value)}
required
/>
</div>
<div>
<label>Precio:</label>
<input
type="number"
value={costo}
onChange={(e) => setCosto(e.target.value)}
required
min="0"
/>
</div>
<div>
<label>Descripción:</label>
<textarea
value={descripcion}
onChange={(e) => setDescripcion(e.target.value)}
required
/>
</div>
<div className="boton-centrado">
<button type="submit">Guardar</button>
</div>
</form>
</div>
</div>
);
}

export default NuevoServicioModal;