import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

const ClasificacionCreate = ({ onClasificacionAdded = () => {} }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ID_Producto: "",
        Etiqueta_Color: "Rojo",
        Accion: "Izquierda",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.ID_Producto <= 0) {
            Swal.fire({
                title: "Error",
                text: "El ID del producto debe ser un número válido.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        try {
            await axios.post("https://ravendev.jeotech.x10.mx/clasificaciones/create", formData);
            Swal.fire({
                title: "¡Éxito!",
                text: "Clasificación creada correctamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
            onClasificacionAdded(); // Llamar a la función de actualización
            navigate("/clasificacion_paquetes"); // Redirigir a la lista de clasificaciones
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Error al crear la clasificación.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
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
        transition: "all 0.3s ease",
    };

    return (
        <>
            <Menu />
            <div className="container mt-5" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="text-center mb-4">Crear Clasificación</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="mb-3">
                                <label className="form-label">ID Producto</label>
                                <input
                                    type="number"
                                    name="ID_Producto"
                                    value={formData.ID_Producto}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Etiqueta de Color</label>
                                <select
                                    name="Etiqueta_Color"
                                    value={formData.Etiqueta_Color}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Rojo">Rojo</option>
                                    <option value="Verde">Verde</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Acción</label>
                                <select
                                    name="Accion"
                                    value={formData.Accion}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Izquierda">Izquierda</option>
                                    <option value="Derecha">Derecha</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Crear Clasificación
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClasificacionCreate;