import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Menu from "../Menu.jsx";

const UsuariosEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Telefono: "",
        Direccion: "",
        Rol: "Cliente",
    });

    // Obtener los datos del usuario al cargar el componente
    useEffect(() => {
        axios.get(`https://ravendev.jeotech.x10.mx/users/${id}`)
            .then(response => setUsuario(response.data))
            .catch(error => console.error(error));
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Mostrar confirmación antes de actualizar
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas actualizar la información del usuario?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://ravendev.jeotech.x10.mx/users/edit/${id}`, usuario)
                    .then(() => {
                        Swal.fire({
                            title: "¡Actualizado!",
                            text: "El usuario ha sido actualizado correctamente.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            navigate("/usuarios"); // Redirigir a la lista de usuarios
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo actualizar el usuario. Inténtelo de nuevo más tarde.",
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                    });
            }
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
            <div className="container mt-5" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <h2 className="text-center mb-4">Editar Usuario</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        name="Nombre"
                                        value={usuario.Nombre}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input
                                        type="text"
                                        name="Apellido"
                                        value={usuario.Apellido}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Correo</label>
                                    <input
                                        type="email"
                                        name="Correo"
                                        value={usuario.Correo}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        name="Telefono"
                                        value={usuario.Telefono}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Dirección</label>
                                    <input
                                        type="text"
                                        name="Direccion"
                                        value={usuario.Direccion}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Rol</label>
                                    <select
                                        name="Rol"
                                        value={usuario.Rol}
                                        onChange={handleChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="Cliente">Cliente</option>
                                        <option value="Empleado">Empleado</option>
                                        <option value="Administrador">Administrador</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary mt-3">
                                Actualizar Usuario
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UsuariosEdit;