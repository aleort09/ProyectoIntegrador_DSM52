import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

const UsuariosCreate = ({ onUsuarioAdded = () => {} }) => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Telefono: "",
        Direccion: "",
        Contraseña: ""
    });

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://54.208.187.128/users/create", usuario)
            .then(() => {
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Usuario registrado correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                onUsuarioAdded();
                navigate("/usuarios");
                setUsuario({
                    Nombre: "",
                    Apellido: "",
                    Correo: "",
                    Telefono: "",
                    Direccion: "",
                    Contraseña: ""
                });
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
                Swal.fire({
                    title: "Error",
                    text: "Error al registrar usuario.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };

    return (
        <>
        <Menu/>
        <div className="container mt-5">
            <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                Regresar
            </button>
            <h2 className="text-center mb-4">Crear Usuario</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="Nombre" value={usuario.Nombre} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input type="text" name="Apellido" value={usuario.Apellido} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" name="Correo" value={usuario.Correo} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" name="Telefono" value={usuario.Telefono} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" name="Direccion" value={usuario.Direccion} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" name="Contraseña" value={usuario.Contraseña} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Usuario</button>
            </form>
        </div>
        </>
    );
};

export default UsuariosCreate;