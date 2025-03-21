import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

const UsuariosCreate = ({ onUsuarioAdded = () => { } }) => {
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
        axios.post("https://ravendev.jeotech.x10.mx/users/create", usuario)
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

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const containerStyle = {
        marginLeft: isMobile ? "0" : "205px",
        marginTop: isMobile ? "30px" : "0",
        padding: "5px",
        transition: "all 0.3s ease"
    };

    return (
        <>
            <Menu />
            <div className="container mt-2" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="text-center mb-4">Crear Usuario</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="Nombre" value={usuario.Nombre} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" name="Apellido" value={usuario.Apellido} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Correo</label>
                                    <input type="email" name="Correo" value={usuario.Correo} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Teléfono</label>
                                    <input type="text" name="Telefono" value={usuario.Telefono} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Dirección</label>
                                    <input type="text" name="Direccion" value={usuario.Direccion} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Contraseña</label>
                                    <input type="password" name="Contraseña" value={usuario.Contraseña} onChange={handleChange} className="form-control" required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary mt-3">Agregar Usuario</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsuariosCreate;