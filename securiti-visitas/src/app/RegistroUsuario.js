"use client";
import React, { useState } from "react";

export default function RegistroUsuario({ onRegistrado }) {
  const [form, setForm] = useState({
    usuario: "",
    clave: "",
    nombre: "",
    rol: "recepcionista"
  });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("Usuario registrado exitosamente");
        setForm({ usuario: "", clave: "", nombre: "", rol: "recepcionista" });
        if (onRegistrado) onRegistrado();
      } else {
        setMensaje(data.mensaje || "Error al registrar usuario");
      }
    } catch {
      setMensaje("Error de conexión");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient" style={{background: 'linear-gradient(135deg, #0d1a4f 0%, #6f42c1 100%)'}}>
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 animate__animated animate__fadeInDown" style={{borderRadius: '1.5rem', background: 'rgba(255,255,255,0.97)'}}>
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4 fw-bold" style={{color: '#0d1a4f'}}>Registrar Usuario</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="usuario" className="form-label fw-semibold text-secondary">Usuario</label>
                  <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    placeholder="Usuario"
                    value={form.usuario}
                    onChange={handleChange}
                    className="form-control form-control-lg border-primary shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="clave" className="form-label fw-semibold text-secondary">Contraseña</label>
                  <input
                    type="password"
                    name="clave"
                    id="clave"
                    placeholder="Contraseña"
                    value={form.clave}
                    onChange={handleChange}
                    className="form-control form-control-lg border-primary shadow-sm"
                    required
                  />
                </div>
                <div className="mb-4">
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
                  <label htmlFor="rol" className="form-label fw-semibold text-secondary">Rol</label>
                  <select
                    name="rol"
                    id="rol"
                    value={form.rol}
                    onChange={handleChange}
                    className="form-select form-select-lg border-primary shadow-sm"
                  >
                    <option value="recepcionista">Recepcionista</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn w-100 py-2 fw-bold fs-5 animate__animated animate__pulse"
                  style={{background: 'linear-gradient(90deg, #0d1a4f 0%, #6f42c1 100%)', color: '#ffd700', border: 'none'}}
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrar"}
                </button>
                {mensaje && <div className="text-center mt-4 fw-semibold animate__animated animate__fadeIn" style={{color: '#0d1a4f'}}>{mensaje}</div>}
              </form>
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
