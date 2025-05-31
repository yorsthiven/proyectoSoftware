import React from 'react';
import {
BrowserRouter as Router,
Routes,
Route,
useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Servicios from './components/Servicios';
import Cabello from './components/Cabello';
import CejasPestanas from './components/CejasPestanas';
import Depilacion from './components/Depilacion';
import Maquillaje from './components/Maquillaje';
import Unas from './components/Unas';
import Spa from './components/Spa';
import Productos from './components/Productos';
import Contacto from './components/Contacto';
import ControlDashboard from './components/ControlDashboard';
import ControlClientes from './components/ControlClientes';
import RutaProtegida from './components/RutaProtegida';
import ScrollToTop from './components/ScrollToTop';
import ControlCitas from './components/ControlCitas';
import ControlServicios from './components/ControlServicios';
import ControlProductos from './components/ControlProductos';
import ControlReportes from './components/ControlReportes';
import AgendarCitaCliente from './components/AgendarCitaCliente';

function AppContent() {
const location = useLocation();

// Oculta el header y footer si es una ruta de panel administrativo
const ocultarHeaderFooter =
location.pathname.startsWith('/dashboard') ||
location.pathname.startsWith('/clientes');

return (
<>
{!ocultarHeaderFooter && <Header />}

  <Routes>
    {/* Públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/servicios" element={<Servicios />} />
    <Route path="/cabello" element={<Cabello />} />
    <Route path="/cejas-pestanas" element={<CejasPestanas />} />
    <Route path="/depilacion" element={<Depilacion />} />
    <Route path="/maquillaje" element={<Maquillaje />} />
    <Route path="/unas" element={<Unas />} />
    <Route path="/spa" element={<Spa />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/agendar-cita" element={<AgendarCitaCliente />} />

    {/* Privadas */}
    <Route element={<RutaProtegida />}>
      <Route path="/dashboard" element={<ControlDashboard />} />
      <Route path="/clientes" element={<ControlClientes />} />
      <Route path="/dashboard/citas" element={<ControlCitas />} />
      <Route path="/dashboard/servicios" element={<ControlServicios />} />
      <Route path="/dashboard/productos" element={<ControlProductos />} />
      <Route path="/dashboard/reportes" element={<ControlReportes />} />

    </Route>
  </Routes>

  {!ocultarHeaderFooter && <Footer />}
</>
);
}

function App() {
return (
<Router>
<ScrollToTop />
<AppContent />
</Router>
);
}

export default App;