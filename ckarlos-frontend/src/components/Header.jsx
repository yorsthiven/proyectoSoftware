import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './Home.css';
import LoginModal from './LoginModal';
import RegistroModal from './RegistroModal';

function Header() {
const [mostrarLogin, setMostrarLogin] = useState(false);
const [showRegistro, setShowRegistro] = useState(false);

return (
<>
<header className="header">
<img src="/logob.png" alt="Logo" className="logo" />
<nav className="navbar">
<Link to="/">Inicio</Link>
<Link to="/servicios">Servicios</Link>
<Link to="/productos">Productos</Link>
<Link to="/contacto">Contáctenos</Link>
</nav>
<div className="acciones">
<button className="btn-acceso" onClick={() => setMostrarLogin(true)}>
<FaSignInAlt className="icono" />
INICIAR SESIÓN
</button>
<button className="btn-acceso" onClick={() => setShowRegistro(true)}>
<FaUserPlus className="icono" />
REGISTRARSE
</button>
</div>
</header>
  <LoginModal isOpen={mostrarLogin} onClose={() => setMostrarLogin(false)} />
  <RegistroModal isOpen={showRegistro} onClose={() => setShowRegistro(false)} />
</>
);
}

export default Header;
