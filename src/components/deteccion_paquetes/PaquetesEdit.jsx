import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importar SweetAlert
import Menu from '../Menu';

const PaquetesEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Distancia: "",
        Estado: "Detectado",
    });

    useEffect(() => {
        Axios.get(`https://ravendev.jeotech.x10.mx/detecciones/${id}`)
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching package data", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas actualizar la información del paquete?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.put(`https://ravendev.jeotech.x10.mx/detecciones/edit/${id}`, formData)
                    .then((response) => {
                        if (response.status === 200) {
                            Swal.fire({
                                title: "¡Actualizado!",
                                text: "El paquete ha sido actualizado correctamente.",
                                icon: "success",
                                confirmButtonText: "Aceptar",
                            }).then(() => {
                                navigate("/deteccion_paquetes");
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error updating package", error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo actualizar el paquete. Inténtalo de nuevo más tarde.",
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
                    <div className="col-md-8 col-lg-6">
                        <h2 className="text-center mb-4">Editar Paquete</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="mb-3">
                                <label htmlFor="Distancia" className="form-label">Distancia (cm)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="Distancia"
                                    name="Distancia"
                                    value={formData.Distancia}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Estado" className="form-label">Estado</label>
                                <select
                                    className="form-select"
                                    id="Estado"
                                    name="Estado"
                                    value={formData.Estado}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Detectado">Detectado</option>
                                    <option value="No detectado">No detectado</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Guardar cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaquetesEdit;
