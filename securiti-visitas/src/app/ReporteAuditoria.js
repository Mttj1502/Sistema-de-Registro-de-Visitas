
"use client";
import React, { useEffect, useState } from "react";

export default function ReporteAuditoria({ token }) {
  const [auditoria, setAuditoria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auditoria", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setAuditoria(data);
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">Reporte de Auditoría</h2>
      {loading ? (
        <div className="text-blue-700 animate-pulse">Cargando...</div>
      ) : auditoria.length === 0 ? (
        <div className="text-blue-700">No hay registros de auditoría.</div>
      ) : (
        <table className="w-full border-2 border-blue-400 rounded-lg overflow-hidden">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Usuario</th>
              <th className="border p-2">Acción</th>
              <th className="border p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {auditoria.map((a) => (
              <tr key={a.id} className="hover:bg-blue-100 transition-all duration-150">
                <td className="border p-2">{a.id}</td>
                <td className="border p-2">{a.usuario}</td>
                <td className="border p-2">{a.accion}</td>
                <td className="border p-2">{new Date(a.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
