import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import './style.css';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaHome } from "react-icons/fa";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Telefono: "",
        Direccion: "",
        Contraseña: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://54.208.187.128/users/registro", formData)
            .then(response => {
                Swal.fire("Éxito", "Registro exitoso", "success");
                localStorage.setItem("userId", response.data.userId);
                navigate("/");
            })
            .catch(error => {
                console.error("Error al registrar usuario:", error);
                Swal.fire("Error", "Hubo un error al registrar", "error");
            });
    };

    return (
        <div className="auth-container">
            <div className="auth-box register-box">
                <h2 className="text-center">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input type="text" name="Nombre" placeholder="Nombre" className="form-control" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><FaUser /></span>
                            <input type="text" name="Apellido" placeholder="Apellido" className="form-control" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text"><FaEnvelope /></span>
                            <input type="email" name="Correo" placeholder="Correo" className="form-control" required onChange={handleChange} />
                        </div>
                        {/* Teléfono */}
                        <div className="input-group">
                            <span className="input-group-text"><FaPhone /></span>
                            <input type="text" name="Telefono" placeholder="Teléfono" className="form-control" onChange={handleChange} />
                        </div>
                        {/* Dirección */}
                        <div className="input-group">
                            <span className="input-group-text"><FaHome /></span>
                            <input type="text" name="Direccion" placeholder="Dirección" className="form-control" onChange={handleChange} />
                        </div>
                        {/* Contraseña */}
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input type="password" name="Contraseña" placeholder="Contraseña" className="form-control" required onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">Registrarse</button>
                </form>
                <p className="mt-3 auth-links">¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>
            </div>
        </div>
    );
};

export default RegisterForm;
