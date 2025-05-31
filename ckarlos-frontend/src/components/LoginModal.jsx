import React, { useState } from 'react';
import './LoginModal.css';
import API from '../api';
import { useNavigate } from 'react-router-dom';

function LoginModal({ isOpen, onClose }) {
const [usuario, setUsuario] = useState('');
const [contrasena, setContrasena] = useState('');
const [recordar, setRecordar] = useState(false);
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();
setError('');

try {
const response = await API.post('/auth/login', {
correo: usuario,
contrasena: contrasena,
});


const { token, usuario: usuarioLogeado } = response.data;

if (recordar) {
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuarioLogeado));
} else {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('usuario', JSON.stringify(usuarioLogeado));
}

alert('Inicio de sesión exitoso');
onClose();

if (usuarioLogeado.tipo === 'Administrador') {
  navigate('/dashboard');
} else {
  navigate('/agendar-cita');
}
} catch (err) {
console.error(err);
setError('Credenciales inválidas. Inténtalo de nuevo.');
}
};

if (!isOpen) return null;

return (
<div className="modal-overlay">
<div className="modal-content">
<button className="cerrar" onClick={onClose}>×</button>
<img src="/login.png" alt="login" className="img-login" />

    <form className="form-login" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Correo"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />

      <div className="recordar-olvide">
        <label>
          <input
            type="checkbox"
            checked={recordar}
            onChange={() => setRecordar(!recordar)}
          />
          Recordarme
        </label>
        <button type="button" className="olvide">¿Olvidaste tu contraseña?</button>
      </div>

      <button type="submit" className="btn-login">Iniciar sesión</button>

      {error && <p className="error">{error}</p>}

      <div className="registrate">
        ¿No tienes cuenta?
        <button type="button" className="btn-registrate">Regístrate</button>
      </div>
    </form>
  </div>
</div>
);
}

export default LoginModal;