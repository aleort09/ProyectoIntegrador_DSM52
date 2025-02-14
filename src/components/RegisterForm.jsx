import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
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
        axios.post("http://localhost:3000/api/usuarios/registro", formData)
            .then(response => {
                alert("Registro exitoso");
                // Guarda el ID del usuario en el localStorage
                localStorage.setItem("userId", response.data.userId);
                navigate("/"); // Redirige al inicio
            })
            .catch(error => {
                console.error("Error al registrar usuario:", error);
                alert("Error al registrar");
            });
    };
    

    return (
        <div>
            <div className="card p-4 shadow-lg">
                <h2 className="text-center">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="nombre" className="form-control" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input type="text" name="apellido" className="form-control" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input type="email" name="correo" className="form-control" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" name="telefono" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección</label>
                        <input type="text" name="direccion" className="form-control" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" name="contraseña" className="form-control" required onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
                <p>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
        </div>
    );
};

export default RegisterForm;