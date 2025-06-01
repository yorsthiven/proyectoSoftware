import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ControlClientes.css';
import API from '../api';
import NuevoClienteModal from './NuevoClienteModal';
import { FaPhone, FaBirthdayCake, FaEnvelope, FaHome } from 'react-icons/fa';

function ControlClientes() {
const [busqueda, setBusqueda] = useState('');
const [cliente, setCliente] = useState(null);
const [mensaje, setMensaje] = useState('');
const [mostrarModal, setMostrarModal] = useState(false);
const [editando, setEditando] = useState(false);
const [formEditar, setFormEditar] = useState({});
const [tabActivo, setTabActivo] = useState('historial');
const [historial, setHistorial] = useState([]);
const [preferencias, setPreferencias] = useState([]);
const [paginaHistorial, setPaginaHistorial] = useState(1);
const [proximaCita, setProximaCita] = useState(null);
const citasPorPagina = 5;

const fechaActual = new Date().toLocaleDateString('es-CO', {
weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const handleBuscar = async () => {
setMensaje('');
setCliente(null);
setEditando(false);
setTabActivo('historial');
setHistorial([]);
setProximaCita(null);
try {
const { data } = await API.get(`/usuarios?nombre=${encodeURIComponent(busqueda)}`);
const clienteEncontrado = data.find(u => u.tipo === 'Cliente');
if (clienteEncontrado) setCliente(clienteEncontrado);
else setMensaje('Cliente no encontrado');
} catch (error) {
console.error('Error al buscar cliente:', error.response?.data || error.message);
setMensaje('Error al buscar cliente');
}
};

const handleGuardarCambios = async () => {
try {
await API.patch('/usuarios', {
id: cliente._id,
usuario: cliente.usuario,
nombre: formEditar.nombre,
correo: formEditar.correo,
telefono: formEditar.telefono,
contrasena: formEditar.contrasena || ''
});
setMensaje('Cliente actualizado');
setCliente({ ...cliente, ...formEditar });
setEditando(false);
} catch (error) {
console.error('Error al guardar cambios:', error.response?.data || error.message);
setMensaje('Error al actualizar cliente');
}
};

const fetchHistorialCliente = async () => {
if (!cliente?._id) return;
try {
const { data } = await API.get('/citas');
const citasCliente = data.filter(cita => cita.cliente?._id === cliente._id);
setHistorial(citasCliente);


  const hoy = new Date();
  const futuras = citasCliente
    .filter(cita => new Date(cita.horarioServicio?.fecha) >= hoy)
    .sort((a, b) => new Date(a.horarioServicio?.fecha) - new Date(b.horarioServicio?.fecha));

  if (futuras.length > 0) {
    const citaProxima = futuras[0];
    const fechaFormateada = new Date(citaProxima.horarioServicio?.fecha).toLocaleDateString('es-CO');
    setProximaCita(`${fechaFormateada} a las ${citaProxima.horarioServicio?.hora}`);
  } else {
    setProximaCita(null);
  }

  const conteo = {};
  citasCliente.forEach(cita => {
    const nombre = cita.horarioServicio?.servicio?.nombre;
    if (nombre) conteo[nombre] = (conteo[nombre] || 0) + 1;
  });
  const top = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .map(([nombre, cantidad]) => ({ nombre, cantidad }));
  setPreferencias(top);
} catch (err) {
  console.error('Error al obtener historial:', err);
}
};

useEffect(() => {
if (cliente) fetchHistorialCliente();
}, [cliente]);

const indexInicio = (paginaHistorial - 1) * citasPorPagina;
const citasPaginas = historial.slice(indexInicio, indexInicio + citasPorPagina);
const totalPaginasHistorial = Math.ceil(historial.length / citasPorPagina);

return (
<div className="panel-clientes">
<Sidebar />
<main className="contenido-panel">
<div className="encabezado-dashboard">
<h2 className="titulo-dashboard">CLIENTES</h2>
<img src="/logob.png" alt="Logo" className="logo-dashboard" />
</div>


    <p className="fecha-actual">{fechaActual}</p>

    <div className="barra-superior">
      <button className="btn-nuevo" onClick={() => setMostrarModal(true)}>+ Nuevo Cliente</button>
      <div className="busqueda-cliente">
        <input
          type="text"
          placeholder="Buscar cliente por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn-buscar" onClick={handleBuscar}>Buscar</button>
      </div>
    </div>

    <NuevoClienteModal
      isOpen={mostrarModal}
      onClose={() => setMostrarModal(false)}
      onClienteCreado={() => {
        setMensaje('Cliente creado con éxito');
        setCliente(null);
      }}
    />

    {mensaje && <p className="mensaje">{mensaje}</p>}

    {cliente && (
      <div className="datos-cliente">
        {editando ? (
          <div className="form-editar-cliente">
            <input type="text" value={formEditar.nombre} onChange={(e) => setFormEditar({ ...formEditar, nombre: e.target.value })} placeholder="Nombre" />
            <input type="email" value={formEditar.correo} onChange={(e) => setFormEditar({ ...formEditar, correo: e.target.value })} placeholder="Correo" />
            <input type="tel" value={formEditar.telefono || ''} onChange={(e) => setFormEditar({ ...formEditar, telefono: e.target.value })} placeholder="Teléfono" />
            <input type="password" value={formEditar.contrasena || ''} onChange={(e) => setFormEditar({ ...formEditar, contrasena: e.target.value })} placeholder="Nueva contraseña (opcional)" />
          </div>
        ) : (
          <>
            <h3>{cliente.nombre}</h3>
            <p><FaEnvelope /> {cliente.correo}</p>
            <p><FaPhone /> {cliente.telefono || 'No registrado'}</p>
            <p><FaBirthdayCake /> {cliente.fechaNacimiento?.substring(0, 10) || 'Sin fecha registrada'}</p>
            <p><FaHome /> Dirección no disponible</p>
          </>
        )}

        <div className="acciones-cliente">
          {editando ? (
            <button className="btn-programar" onClick={handleGuardarCambios}>Guardar Cambios</button>
          ) : (
            <button className="btn-editar" onClick={() => {
              setEditando(true);
              setFormEditar({ nombre: cliente.nombre, correo: cliente.correo, telefono: cliente.telefono || '', contrasena: '' });
            }}>Editar</button>
          )}
          <button className="btn-programar">Programar Cita</button>
        </div>

        <div className="tabs-cliente">
          <button className={tabActivo === 'historial' ? 'activo' : ''} onClick={() => setTabActivo('historial')}>Historial</button>
          <button className={tabActivo === 'preferencias' ? 'activo' : ''} onClick={() => setTabActivo('preferencias')}>Preferencias</button>
        </div>

        {tabActivo === 'historial' && (
          <div className="tabla-historial">
            <h4>Historial de Citas</h4>
            {citasPaginas.length === 0 ? <p>Sin citas registradas.</p> : (
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Servicio</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {citasPaginas.map((cita, i) => (
                    <tr key={i}>
                      <td>{new Date(cita.horarioServicio?.fecha).toLocaleDateString()}</td>
                      <td>{cita.horarioServicio?.hora}</td>
                      <td>{cita.horarioServicio?.servicio?.nombre}</td>
                      <td>{cita.confirmacionCita ? '✅ Confirmada' : '🕒 Pendiente'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="paginacion">
              {Array.from({ length: totalPaginasHistorial }, (_, i) => (
                <button key={i} className={paginaHistorial === i + 1 ? 'activo' : ''} onClick={() => setPaginaHistorial(i + 1)}>{i + 1}</button>
              ))}
            </div>
          </div>
        )}

        {tabActivo === 'preferencias' && (
          <div className="tabla-preferencias">
            <h4>Servicios más frecuentes</h4>
            {preferencias.length === 0 ? <p>Sin datos suficientes.</p> : (
              <table>
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Veces Solicitado</th>
                  </tr>
                </thead>
                <tbody>
                  {preferencias.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <div className="proxima-cita">
          <p>Próxima cita: {proximaCita || 'No hay cita agendada'}</p>
        </div>
      </div>
    )}
  </main>
</div>
);
}

export default ControlClientes;