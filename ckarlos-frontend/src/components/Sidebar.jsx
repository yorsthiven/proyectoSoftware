import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
const navigate = useNavigate();
const location = useLocation();

const handleCerrarSesion = () => {
localStorage.removeItem('token');
sessionStorage.removeItem('token');
navigate('/');
};

// Función para aplicar la clase activa
const obtenerClase = (ruta) => {
return location.pathname === ruta ? 'opcion activo' : 'opcion';
};

return (
<aside className="menu-lateral">
<img src="/fotousuario.png" alt="Usuario" className="foto-usuario" />
<nav className="menu-opciones">
<button className={obtenerClase('/dashboard')} onClick={() => navigate('/dashboard')}>
Dashboard
</button>
<button className={obtenerClase('/clientes')} onClick={() => navigate('/clientes')}>
Clientes
</button>
<button className={`opcion ${location.pathname === '/dashboard/citas' ? 'activo' : ''}`}
  onClick={() => navigate('/dashboard/citas')}>
Citas
</button>
<button
className={`opcion ${location.pathname === '/dashboard/servicios' ? 'activo' : ''}`}
  onClick={() => navigate('/dashboard/servicios')}
>
  Servicios
</button>

<button
className={`opcion ${location.pathname === '/dashboard/productos' ? 'activo' : ''}`}
onClick={() => navigate('/dashboard/productos')}
>
Productos
</button>

<button
className={`opcion ${location.pathname === '/dashboard/reportes' ? 'activo' : ''}`}
onClick={() => navigate('/dashboard/reportes')}
>
Reportes
</button>


<button className="opcion cerrar-sesion" onClick={handleCerrarSesion}>
Cerrar sesión
</button>
</nav>
</aside>
);
}

export default Sidebar;