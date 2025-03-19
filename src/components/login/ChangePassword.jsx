import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css';

const ChangePassword = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [correoValido, setCorreoValido] = useState(false);
    const [intentos, setIntentos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    // Verifica si el usuario ya estaba bloqueado al cargar la página
    useEffect(() => {
        const bloqueoGuardado = localStorage.getItem("bloqueoCambio");
        if (bloqueoGuardado) {
            const tiempoPasado = Date.now() - parseInt(bloqueoGuardado, 10);
            if (tiempoPasado < 5 * 60 * 1000) {
                setBloqueado(true);
                setMensaje("Demasiados intentos fallidos. Intenta nuevamente en 5 minutos.");

                // Desbloqueo automático cuando pasen los 5 minutos
                setTimeout(() => {
                    setBloqueado(false);
                    setMensaje("");
                    localStorage.removeItem("bloqueoCambio");
                }, 5 * 60 * 1000 - tiempoPasado);
            }
        }
    }, []);

    // Validar si el correo existe antes de permitir cambiar la contraseña
    const verificarCorreo = async (e) => {
        e.preventDefault();

        if (bloqueado) {
            setMensaje("Demasiados intentos fallidos. Intenta nuevamente en 5 minutos.");
            return;
        }

        if (intentos >= 2) { // Último intento antes del bloqueo
            setBloqueado(true);
            setMensaje("Has excedido los intentos. Espera 5 minutos.");
            localStorage.setItem("bloqueoCambio", Date.now());

            setTimeout(() => {
                setBloqueado(false);
                setMensaje("");
                localStorage.removeItem("bloqueoCambio");
            }, 5 * 60 * 1000);
            return;
        }

        try {
            const response = await axios.get(`https://54.208.187.128/users/existe/${correo}`);
            if (response.data.status === "success") {
                setCorreoValido(true);
                setMensaje("Correo válido. Ingresa tu nueva contraseña.");
            } else {
                setIntentos(prev => prev + 1);
                setMensaje(`Correo incorrecto. Intento ${intentos + 1} de 3.`);
            }
        } catch (error) {
            console.error("Error al verificar el correo:", error);
            setMensaje("Error en la verificación.");
        }
    };

    // Cambiar contraseña
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (bloqueado) return;

        try {
            const response = await axios.post("https://54.208.187.128/users/cambiar_password", {
                correo,
                password
            });
            setMensaje(response.data.message);
            setCorreo("");
            setPassword("");
            setCorreoValido(false);

            // Redirige al login después de 2 segundos
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            setMensaje("Hubo un error al cambiar tu contraseña.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="text-center">Cambiar Contraseña</h2>
                {mensaje && <div className={`alert ${mensaje.includes("éxito") ? "alert-success" : "alert-danger"}`}>{mensaje}</div>}

                {/* Formulario para validar el correo */}
                {!correoValido && (
                    <form onSubmit={verificarCorreo}>
                        <input
                            type="email"
                            placeholder="Correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                            className="form-control"
                            disabled={bloqueado}
                        />
                        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={bloqueado}>
                            {bloqueado ? "Bloqueado" : "Validar Correo"}
                        </button>
                    </form>
                )}

                {/* Si el correo es válido, aparece el formulario para cambiar la contraseña */}
                {correoValido && (
                    <form onSubmit={handleSubmit} className="mt-3">
                        <input
                            type="password"
                            placeholder="Nueva Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Cambiar Contraseña
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
