import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/usuarios/login", { correo, contraseña })
            .then(response => {
                localStorage.setItem("userId", response.data.userId);
                alert("Inicio de sesión exitoso");
                navigate("/"); // Redirige al inicio
            })
            .catch(error => {
                console.error("Error en el login:", error);
                alert("Credenciales incorrectas");
            });
    };
    

    return (
        <div className="card p-4 shadow-lg">
            <h2 className="text-center">Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required  className="form-control"/>
                <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required className="form-control"/>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
            <p>¿No tienes una cuenta? <Link to="/registrar">Registrate</Link></p>
            <p>¿Olvidaste tu contraseña? <Link to="/recuperar">Presiona aquí</Link></p>
        </div>
    );
};

export default LoginForm;