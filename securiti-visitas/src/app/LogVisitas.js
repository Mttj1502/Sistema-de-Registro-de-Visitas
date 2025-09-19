
"use client";
import React, { useEffect, useState } from "react";

export default function LogVisitas() {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/visitas")
      .then((res) => res.json())
      .then((data) => {
        setVisitas(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow">
      <h2 className="h3 fw-bold mb-4 text-center text-primary">Log de Visitas</h2>
      {loading ? (
          <div className="text-center text-primary">Cargando...</div>
        ) : visitas.length === 0 ? (
          <div className="text-center text-primary">No hay visitas registradas.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Empresa</th>
                  <th>Correo</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {visitas.map((v, i) => (
                  <tr key={i}>
                    <td>{v.nombre}</td>
                    <td>{v.empresa}</td>
                    <td>{v.correo}</td>
                    <td>{v.motivo}</td>
                    <td>{new Date(v.fecha).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}
    </div>
  );
}
