import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './style.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        Apellido: "",
        correo: "",
        telefono: "",
        direccion: "",
        contraseña: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://54.208.187.128/users/registro", formData)
            .then(response => {
                alert("Registro exitoso");
                localStorage.setItem("userId", response.data.userId);
                navigate("/");
            })
            .catch(error => {
                console.error("Error al registrar usuario:", error);
                alert("Error al registrar");
            });
    };


    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="text-center">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre" name="nombre" className="form-control" required onChange={handleChange} />
                    <input type="text" placeholder="Apellido" name="apellido" className="form-control" required onChange={handleChange} />
                    <input type="email" placeholder="Correo" name="correo" className="form-control" required onChange={handleChange} />
                    <input type="text" placeholder="Telefono" name="telefono" className="form-control" onChange={handleChange} />
                    <input type="text" placeholder="Dirección" name="direccion" className="form-control" onChange={handleChange} />
                    <input type="password" placeholder="Contraseña" name="contraseña" className="form-control" required onChange={handleChange} />
                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
                <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
        </div>
    );
};

export default RegisterForm;