import React, { useState } from 'react';
import './NuevoClienteModal.css';
import API from '../api';

function NuevoClienteModal({ isOpen, onClose, onClienteCreado }) {
const [form, setForm] = useState({
nombre: '',
usuario: '', // 
correo: '',
contrasena: '',
confirmar: '',
telefono: '',
fechaNacimiento: '',
genero: ''
});

const [mensaje, setMensaje] = useState('');

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setMensaje('');

if (form.contrasena !== form.confirmar) {
  setMensaje('Las contraseñas no coinciden');
  return;
}

try {
  await API.post('/usuarios', {
    nombre: form.nombre,
    usuario: form.usuario, // ✅ requerido por backend
    correo: form.correo,
    contrasena: form.contrasena,
    telefono: form.telefono,
    fechaNacimiento: form.fechaNacimiento,
    genero: form.genero,
    tipo: 'Cliente'
  });

  onClienteCreado();
  setForm({
    nombre: '',
    usuario: '',
    correo: '',
    contrasena: '',
    confirmar: '',
    telefono: '',
    fechaNacimiento: '',
    genero: ''
  });
  onClose();
} catch (error) {
  console.error('Error al registrar cliente:', error.response?.data || error.message);
  setMensaje(error.response?.data?.message || 'Error al crear cliente. Intenta más tarde.');
}
};

if (!isOpen) return null;

return (
<div className="modal-overlay">
<div className="modal-content nuevo-cliente-modal">
<button className="cerrar" onClick={onClose}>×</button>
<h2>Nuevo Cliente</h2>

    <form className="form-nuevo-cliente" onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="usuario"
        placeholder="Usuario"
        value={form.usuario}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmar"
        placeholder="Confirmar contraseña"
        value={form.confirmar}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono (opcional)"
        value={form.telefono}
        onChange={handleChange}
      />
      <input
        type="date"
        name="fechaNacimiento"
        value={form.fechaNacimiento}
        onChange={handleChange}
      />
      <select
        name="genero"
        value={form.genero}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona género</option>
        <option value="Femenino">Femenino</option>
        <option value="Masculino">Masculino</option>
        <option value="Otro">Otro</option>
      </select>

      <button type="submit" className="btn-registrar">Registrar Cliente</button>
      {mensaje && <p className="error">{mensaje}</p>}
    </form>
  </div>
</div>
);
}

export default NuevoClienteModal;



