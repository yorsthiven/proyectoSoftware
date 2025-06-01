import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import API from '../api';
import './ControlReportes.css';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9932CC', '#DC143C', '#FF6347'];

function ControlReportes() {
  const [datos, setDatos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await API.get('/citas/citas-por-servicio');
        setDatos(res.data.detallePorServicio);
        setTotal(res.data.totalCitas);
      } catch (err) {
        console.error('Error al obtener reporte:', err);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div className="panel-reportes">
      <Sidebar />
      <main className="contenido-panel">
        <div className="encabezado-dashboard">
          <h2 className="titulo-dashboard">REPORTES</h2>
          <img src="/logob.png" alt="Logo" className="logo-dashboard" />
        </div>

        <p className="fecha-actual">
          {new Date().toLocaleDateString('es-CO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <div className="tabla-reportes">
          <h3>Resumen de citas por servicio</h3>
          <table>
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Cantidad de Citas</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, i) => (
                <tr key={i}>
                  <td>{item._id}</td>
                  <td>{item.totalCitas}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-reporte">Total de citas: {total}</p>
        </div>

        <div className="grafico-pie">
          <h3>Gráfico de distribución</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={datos}
                dataKey="totalCitas"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {datos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default ControlReportes;

