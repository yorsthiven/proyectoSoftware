import React, { useState } from 'react';
import './LoginModal.css'; 
import API from '../api';

function RegistroModal({ isOpen, onClose }) {
const [usuario, setUsuario] = useState('');
const [correo, setCorreo] = useState('');
const [contrasena, setContrasena] = useState('');
const [confirmarContrasena, setConfirmarContrasena] = useState('');
const [mensaje, setMensaje] = useState('');

const handleSubmit = async (e) => {
e.preventDefault();
setMensaje('');

if (contrasena !== confirmarContrasena) {
  setMensaje('Las contraseñas no coinciden');
  return;
}

try {
  const response = await API.post('/usuarios', {
    usuario,
    contrasena,
    nombre: usuario,
    correo,
    tipo: 'Cliente'
  });

  setMensaje('¡Usuario registrado exitosamente!');
  setUsuario('');
  setCorreo('');
  setContrasena('');
  setConfirmarContrasena('');
} catch (error) {
  console.error(error);
  setMensaje('Error al registrar. Verifica los datos o intenta más tarde.');
}
};

if (!isOpen) return null;

return (
<div className="modal-overlay">
<div className="modal-content">
<button className="cerrar" onClick={onClose}>×</button>
<img src="/registro.png" alt="registro" className="img-login" />
<form className="form-login" onSubmit={handleSubmit}>
<input
type="text"
placeholder="Nombre de usuario"
value={usuario}
onChange={(e) => setUsuario(e.target.value)}
required
/>
<input
type="email"
placeholder="Correo"
value={correo}
onChange={(e) => setCorreo(e.target.value)}
required
/>
<input
type="password"
placeholder="Contraseña"
value={contrasena}
onChange={(e) => setContrasena(e.target.value)}
required
/>
<input
type="password"
placeholder="Confirmar contraseña"
value={confirmarContrasena}
onChange={(e) => setConfirmarContrasena(e.target.value)}
required
/>

      <button type="submit" className="btn-login">REGISTRARME</button>
      {mensaje && <p className="error">{mensaje}</p>}
    </form>
  </div>
</div>
);
}

export default RegistroModal;