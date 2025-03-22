import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Menu from "../Menu.jsx";

const RemotosEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [remoto, setRemoto] = useState({
        Nombre: "",
        IP: "",
        Ubicacion: "",
        Estado: "Activo",
    });

    // Obtener los datos del remoto al cargar el componente
    useEffect(() => {
        axios.get(`https://ravendev.jeotech.x10.mx/remotos/${id}`)
            .then(response => setRemoto(response.data))
            .catch(error => console.error(error));
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setRemoto({ ...remoto, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas actualizar la información del remoto?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://ravendev.jeotech.x10.mx/remotos/edit/${id}`, remoto)
                    .then(() => {
                        Swal.fire({
                            title: "¡Actualizado!",
                            text: "El remoto ha sido actualizado correctamente.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            navigate("/remotos"); // Redirigir a la lista de remotos
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo actualizar el remoto. Inténtelo de nuevo más tarde.",
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
                        <h2 className="text-center mb-4">Editar Remoto</h2>
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
                                        value={remoto.Nombre}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">IP</label>
                                    <input
                                        type="text"
                                        name="IP"
                                        value={remoto.IP}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Ubicación</label>
                                    <input
                                        type="text"
                                        name="Ubicacion"
                                        value={remoto.Ubicacion}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Estado</label>
                                    <select
                                        name="Estado"
                                        value={remoto.Estado}
                                        onChange={handleChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary mt-3">
                                Actualizar Remoto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RemotosEdit;
