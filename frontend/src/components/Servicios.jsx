import React, { useEffect, useState } from "react";

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3500/servicios") // Cambia si tu ruta es distinta
      .then((res) => res.json())
      .then((data) => {
        setServicios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener servicios:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando servicios...</p>;

  return (
    <div>
      <h2>Servicios disponibles</h2>
      <ul>
        {servicios.map((servicio) => (
          <li key={servicio.id}>{servicio.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default Servicios;
