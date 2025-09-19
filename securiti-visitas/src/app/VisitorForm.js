

"use client";
import React, { useState } from "react";

export default function VisitorForm() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    correo: "",
    motivo: ""
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/visitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setEnviado(true);
      } else {
        alert("Error al registrar la visita");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0" style={{borderRadius: '1.5rem', background: 'rgba(255,255,255,0.97)'}}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title fw-bold mb-0 text-primary">Registro de Visita</h2>
                <button
                  className="btn btn-warning fw-bold"
                  onClick={() => window.location.href = '/'}
                >
                  Cerrar sesión
                </button>
              </div>
              {enviado ? (
                <div className="alert alert-success text-center">¡Registro exitoso!</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label fw-semibold text-secondary">Nombre completo</label>
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      placeholder="Nombre completo"
                      value={form.nombre}
                      onChange={handleChange}
                      className="form-control form-control-lg border-primary shadow-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="empresa" className="form-label fw-semibold text-secondary">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      id="empresa"
                      placeholder="Empresa"
                      value={form.empresa}
                      onChange={handleChange}
                      className="form-control form-control-lg border-primary shadow-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="correo" className="form-label fw-semibold text-secondary">Correo electrónico</label>
                    <input
                      type="email"
                      name="correo"
                      id="correo"
                      placeholder="Correo electrónico"
                      value={form.correo}
                      onChange={handleChange}
                      className="form-control form-control-lg border-primary shadow-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="motivo" className="form-label fw-semibold text-secondary">Motivo de la visita</label>
                    <input
                      type="text"
                      name="motivo"
                      id="motivo"
                      placeholder="Motivo de la visita"
                      value={form.motivo}
                      onChange={handleChange}
                      className="form-control form-control-lg border-primary shadow-sm"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-bold fs-5 animate__animated animate__pulse"
                    style={{background: 'linear-gradient(90deg, #0d1a4f 0%, #6f42c1 100%)', color: '#ffd700', border: 'none'}}
                  >
                    Registrar visita
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Animaciones y estilos extra */}
      <style>{`
        .btn:hover {
          background: linear-gradient(90deg, #6f42c1 0%, #0d1a4f 100%) !important;
          color: #ffd700 !important;
          box-shadow: 0 0 20px #0d1a4f44;
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    </div>
  );
}
