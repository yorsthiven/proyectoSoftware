import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function RutaProtegida() {
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
return token ? <Outlet /> : <Navigate to="/" />;
}

export default RutaProtegida;