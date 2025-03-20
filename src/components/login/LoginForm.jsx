import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import './style.css';
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm = () => {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [intentos, setIntentos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const bloqueoGuardado = localStorage.getItem("bloqueo");
        if (bloqueoGuardado) {
            const tiempoRestante = Date.now() - parseInt(bloqueoGuardado, 10);
            if (tiempoRestante < 5 * 60 * 1000) {
                setBloqueado(true);
                Swal.fire({
                    icon: "error",
                    title: "Demasiados intentos",
                    text: "Intenta nuevamente en 5 minutos."
                });
                setTimeout(() => {
                    setBloqueado(false);
                    localStorage.removeItem("bloqueo");
                }, 5 * 60 * 1000 - tiempoRestante);
            }
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (bloqueado) {
            Swal.fire("Espera", "Demasiados intentos fallidos. Intenta nuevamente en 5 minutos.", "warning");
            return;
        }

        try {
            const response = await axios.post("https://54.208.187.128/users/login", {
                Correo: correo,
                Contraseña: contraseña
            });

            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("rol", response.data.rol);

            Swal.fire({
                icon: "success",
                title: "¡Inicio exitoso!",
                text: "Redirigiendo...",
                timer: 2000,
                showConfirmButton: false
            });

            setTimeout(() => {
                if (response.data.rol === "Administrador") {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            }, 2000);
        } catch (error) {
            setIntentos(prev => prev + 1);
            if (intentos + 1 >= 3) {
                Swal.fire("Error", "Has excedido los intentos. Intenta nuevamente en 5 minutos.", "error");
                setBloqueado(true);
                localStorage.setItem("bloqueo", Date.now());
                setTimeout(() => {
                    setBloqueado(false);
                    localStorage.removeItem("bloqueo");
                }, 5 * 60 * 1000);
            } else {
                Swal.fire("Error", "Credenciales incorrectas.", "error");
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box animate-fade-in">
                <h2 className="text-center">Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required disabled={bloqueado} />
                    </div>
                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required disabled={bloqueado} />
                    </div>
                    <button type="submit" className="btn-login" disabled={bloqueado}>Ingresar</button>
                </form>
                <div className="auth-links">
                    <p>¿No tienes una cuenta? <Link to="/registrar">Regístrate</Link></p>
                    <p>¿Olvidaste tu contraseña? <Link to="/recuperar">Presiona aquí</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
