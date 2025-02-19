import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../style.css';

const LoginForm = () => {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [intentos, setIntentos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);
    const [mensaje, setMensaje] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        const bloqueoGuardado = localStorage.getItem("bloqueo");
        if (bloqueoGuardado) {
            const tiempoRestante = Date.now() - parseInt(bloqueoGuardado, 10);
            if (tiempoRestante < 5 * 60 * 1000) {
                setBloqueado(true);
                setMensaje("Has excedido los intentos. Intenta nuevamente en 5 minutos.");
                setTimeout(() => {
                    setBloqueado(false);
                    setMensaje("");
                    localStorage.removeItem("bloqueo");
                }, 5 * 60 * 1000 - tiempoRestante);
            }
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (bloqueado) {
            setMensaje("Demasiados intentos fallidos. Intenta nuevamente en 5 minutos.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/usuarios/login", { correo, contraseña });
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("rol", response.data.rol);
            setMensaje("Inicio de sesión exitoso. Redirigiendo...");
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
                setMensaje("Has excedido los intentos. Intenta nuevamente en 5 minutos.");
                setBloqueado(true);
                localStorage.setItem("bloqueo", Date.now());
                setTimeout(() => {
                    setBloqueado(false);
                    setMensaje("");
                    localStorage.removeItem("bloqueo");
                }, 5 * 60 * 1000);
            } else {
                setMensaje("Credenciales incorrectas.");
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="text-center">Iniciar Sesión</h2>
                {mensaje && <div className={`alert ${mensaje.includes("exitoso") ? "alert-success" : "alert-danger"}`}>{mensaje}</div>}
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required className="form-control" disabled={bloqueado} />
                    <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required className="form-control" disabled={bloqueado} />
                    <button type="submit" className="btn btn-primary w-100" disabled={bloqueado}>Ingresar</button>
                </form>
                <p>¿No tienes una cuenta? <Link to="/registrar">Regístrate</Link></p>
                <p>¿Olvidaste tu contraseña? <Link to="/recuperar">Presiona aquí</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
