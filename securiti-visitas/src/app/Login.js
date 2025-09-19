"use client";
import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, clave })
      });
      const data = await res.json();
      if (res.ok) {
        if (onLogin) onLogin(data);
      } else {
        setError(data.mensaje || "Usuario o clave incorrectos");
      }
    } catch (err) {
      setError("Error de conexión");
    }
  };

    return (
      <>
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-0" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
          <div className="row w-100 h-100 g-0" style={{minHeight: '100vh'}}>
            <div className="col-lg-6 d-flex align-items-center justify-content-center p-0 animate__animated animate__fadeInLeft" style={{background: '#fff', boxShadow: '0 0 40px #c3cfe2'}}>
              <div className="w-100 animate__animated animate__fadeInUp" style={{maxWidth: '400px'}}>
                <div className="text-center mb-4">
                  <img src="/logo-removebg-preview.png" alt="Logo" style={{maxWidth: '220px', marginBottom: '20px'}} />
                  <h2 className="fw-bold mb-2" style={{color: '#222', textShadow: '0 2px 8px #fff'}}>Iniciar sesión</h2>
                </div>
                <form onSubmit={handleSubmit} className="mb-3">
                  <div className="mb-4">
                    <label htmlFor="usuario" className="form-label fw-normal" style={{color: '#444'}}>Usuario</label>
                    <div className="input-group" style={{borderBottom: '2px solid #e0e0e0', background: '#fff', borderRadius: 0}}>
                      <span className="input-group-text bg-white border-0 px-2" style={{color: '#bbb', fontSize: '1.5rem', border: 'none', background: 'transparent'}}>
                        <i className="bi bi-person" style={{fontSize: '1.5rem', color: '#bbb'}}></i>
                      </span>
                      <input
                        type="text"
                        name="usuario"
                        id="usuario"
                        placeholder="Escribe tu usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="form-control border-0 px-2"
                        style={{boxShadow: 'none', background: '#fff', color: '#444'}}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="clave" className="form-label fw-normal" style={{color: '#444'}}>Contraseña</label>
                    <div className="input-group" style={{borderBottom: '2px solid #e0e0e0', background: '#fff', borderRadius: 0}}>
                      <span className="input-group-text bg-white border-0 px-2" style={{color: '#bbb', fontSize: '1.5rem', border: 'none', background: 'transparent'}}>
                        <i className="bi bi-lock" style={{fontSize: '1.5rem', color: '#bbb'}}></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="clave"
                        id="clave"
                        placeholder="Escribe tu contraseña"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        className="form-control border-0 px-2"
                        style={{boxShadow: 'none', background: '#fff', color: '#444'}}
                        required
                      />
                      {clave && (
                        <span className="input-group-text bg-white border-0 px-2" style={{color: '#bbb', fontSize: '1.5rem', cursor:'pointer', border: 'none', background: 'transparent', position: 'absolute', right: 0, zIndex: 3}} onClick={() => setShowPassword(!showPassword)}>
                          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} style={{fontSize: '1.5rem', color: '#bbb'}}></i>
                        </span>
                      )}
                    </div>
                  </div>
                  {/* ...no mostrar el enlace de recuperación de contraseña... */}
                  {error && <div className="alert alert-danger animate__animated animate__shakeX">{error}</div>}
                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-bold fs-5 rounded-pill animate__animated animate__pulse"
                    style={{background: 'linear-gradient(90deg, #222 0%, #1935b3 100%)', color: '#fff', border: 'none', boxShadow: '0 2px 8px #1935b344'}}>
                    Entrar
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0 position-relative animate__animated animate__fadeInRight" style={{background: 'linear-gradient(135deg, #fff 0%, #1e2a78 100%)', overflow: 'hidden'}}>
              {/* Formas decorativas animadas */}
              <div className="animate__animated animate__fadeInDown" style={{position: 'absolute', top: '8%', left: '10%', width: '180px', height: '180px', background: 'rgba(30,42,120,0.12)', borderRadius: '50%', animation: 'pulse 3s infinite alternate'}}></div>
              <div className="animate__animated animate__fadeInUp" style={{position: 'absolute', bottom: '10%', right: '10%', width: '120px', height: '120px', background: 'rgba(30,42,120,0.18)', borderRadius: '50%', animation: 'pulse 2.5s infinite alternate'}}></div>
              <div className="animate__animated animate__fadeIn" style={{position: 'absolute', top: '60%', left: '60%', width: '80px', height: '80px', background: 'rgba(30,42,120,0.15)', borderRadius: '50%', animation: 'pulse 2s infinite alternate'}}></div>
              <img src="/visitas 2.png" alt="Visitas" className="img-fluid" style={{width: '100%', height: '50vh', objectFit: 'contain', zIndex: 2, background: 'transparent'}} />
              <style>{`
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 0.8; }
                  100% { transform: scale(1.15); opacity: 1; }
                }
              `}</style>
            </div>
          </div>
          <style>{`
            body {
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            }
            .img-fluid:hover {
              transform: scale(1.08);
              box-shadow: 0 0 30px #fff3;
            }
          `}</style>
          {/* CDN Animate.css para animaciones Bootstrap */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
        </div>
      </>
  );
}
