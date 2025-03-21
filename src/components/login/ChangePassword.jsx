import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import './style.css';
import { FaEnvelope, FaLock } from "react-icons/fa";

const ChangePassword = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [correoValido, setCorreoValido] = useState(false);
    const [intentos, setIntentos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const bloqueoGuardado = localStorage.getItem("bloqueoCambio");
        if (bloqueoGuardado) {
            const tiempoPasado = Date.now() - parseInt(bloqueoGuardado, 10);
            if (tiempoPasado < 5 * 60 * 1000) {
                setBloqueado(true);
                Swal.fire("Bloqueado", "Demasiados intentos. Intenta nuevamente en 5 minutos.", "error");
                setTimeout(() => {
                    setBloqueado(false);
                    localStorage.removeItem("bloqueoCambio");
                }, 5 * 60 * 1000 - tiempoPasado);
            }
        }
    }, []);

    const verificarCorreo = async (e) => {
        e.preventDefault();
    
        if (bloqueado) return;
    
        if (intentos >= 2) {
            setBloqueado(true);
            localStorage.setItem("bloqueoCambio", Date.now());
            Swal.fire("Bloqueado", "Has excedido los intentos. Espera 5 minutos.", "warning");
            setTimeout(() => {
                setBloqueado(false);
                localStorage.removeItem("bloqueoCambio");
            }, 5 * 60 * 1000);
            return;
        }
    
        try {
            const response = await axios.get(`https://ravendev.jeotech.x10.mx/users/existe/${correo}`);
            if (response.data.status === "success") {
                setCorreoValido(true);
                Swal.fire("Validado", "Correo válido. Ingresa tu nueva contraseña.", "success");
            }
        } catch (error) {
            // Si el backend devuelve 404, mostramos el mensaje del backend
            if (error.response && error.response.status === 404) {
                setIntentos(prev => prev + 1);
                Swal.fire("Error", error.response.data.message || "Correo incorrecto.", "error");
            } else {
                console.error("Error al verificar el correo:", error);
                Swal.fire("Error", "Hubo un problema al verificar el correo.", "error");
            }
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (bloqueado) return;
    
        try {
            const response = await axios.post("https://ravendev.jeotech.x10.mx/users/cambiar_password", {
                Correo: correo, // 👈 Cambiado a mayúscula
                Contraseña: password // 👈 Cambiado a mayúscula
            });
            Swal.fire("Éxito", response.data.message, "success");
            setCorreo("");
            setPassword("");
            setCorreoValido(false);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            Swal.fire("Error", error.response?.data?.message || "Hubo un error al cambiar tu contraseña.", "error");
        }
    };
    

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="text-center">Cambiar Contraseña</h2>

                {!correoValido ? (
                    <form onSubmit={verificarCorreo}>
                        <div className="input-group">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input
                                type="email"
                                placeholder="Correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="form-control"
                                required
                                disabled={bloqueado}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={bloqueado}>
                            Validar Correo
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input
                                type="password"
                                placeholder="Nueva Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Cambiar Contraseña
                        </button>
                    </form>
                )}
                <p className="mt-3 auth-links">¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
        </div>
    );
};

export default ChangePassword;
