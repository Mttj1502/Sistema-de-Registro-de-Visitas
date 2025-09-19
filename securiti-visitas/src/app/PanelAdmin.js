
"use client";
import React, { useEffect, useState } from "react";
import ReporteAuditoria from "./ReporteAuditoria";

export default function PanelAdmin({ token, onAgregarUsuario, onCerrarSesion }) {
  const [usuarios, setUsuarios] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const resUsuarios = await fetch("/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usuariosData = await resUsuarios.json();
      const resVisitas = await fetch("/api/visitas", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const visitasData = await resVisitas.json();
      setUsuarios(usuariosData);
      setVisitas(visitasData);
      setLoading(false);
    }
    fetchData();
  }, [token]);

  return (
    <div className="container-fluid min-vh-100 py-5 px-2 d-flex flex-column align-items-center justify-content-center bg-gradient" style={{background: 'linear-gradient(135deg, #0d1a4f 0%, #6f42c1 100%)'}}>
      <div className="row w-100 justify-content-center animate__animated animate__fadeIn">
        <div className="col-lg-10 col-xl-9">
          <div className="card shadow-lg border-0 mb-5" style={{borderRadius: '1.5rem', background: 'rgba(255,255,255,0.97)'}}>
            <div className="card-body p-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title fw-bold mb-0" style={{color: '#0d1a4f'}}>Panel de Administración</h2>
                <div>
                  <button
                    className="btn me-2 fw-bold animate__animated animate__pulse"
                    style={{background: 'linear-gradient(90deg, #0d1a4f 0%, #6f42c1 100%)', color: '#ffd700', border: 'none'}}
                    onClick={onCerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                  <button
                    className="btn fw-bold animate__animated animate__pulse"
                    style={{background: 'linear-gradient(90deg, #ffd700 0%, #0d1a4f 100%)', color: '#0d1a4f', border: 'none'}}
                    onClick={onAgregarUsuario}
                  >
                    Agregar usuario
                  </button>
                </div>
              </div>
              {loading ? (
                <div className="text-center text-primary animate__animated animate__pulse">Cargando...</div>
              ) : (
                <>
                  <section className="mb-5">
                    <h3 className="mb-3 fw-bold" style={{color: '#0d1a4f'}}>Usuarios</h3>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover align-middle shadow-sm">
                        <thead style={{background: '#0d1a4f', color: '#ffd700'}}>
                          <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Rol</th>
                          </tr>
                        </thead>
                        <tbody>
                          {usuarios.map((u) => (
                            <tr key={u.id} className="table-row">
                              <td>{u.id}</td>
                              <td>{u.usuario}</td>
                              <td>{u.nombre}</td>
                              <td><span className="badge bg-primary text-light px-3 py-2">{u.rol}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                  <section className="mb-5">
                    <h3 className="mb-3 fw-bold" style={{color: '#0d1a4f'}}>Visitas</h3>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover align-middle shadow-sm">
                        <thead style={{background: '#0d1a4f', color: '#ffd700'}}>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Correo</th>
                            <th>Motivo</th>
                            <th>Fecha</th>
                            <th>Usuario</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visitas.map((v) => (
                            <tr key={v.id} className="table-row">
                              <td>{v.id}</td>
                              <td>{v.nombre}</td>
                              <td>{v.empresa}</td>
                              <td>{v.correo}</td>
                              <td>{v.motivo}</td>
                              <td>{new Date(v.fecha).toLocaleString()}</td>
                              <td>{v.usuario_id}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                  <ReporteAuditoria token={token} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Animaciones y estilos extra */}
      <style>{`
        .table-row:hover {
          background: #e3e8ff !important;
          transition: background 0.3s;
        }
        .badge.bg-primary {
          background: #0d1a4f !important;
          color: #ffd700 !important;
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    </div>
  );
}
