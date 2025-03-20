import React, { useState, useEffect } from "react";
import Axios from "axios";
import Menu from "../Menu";
import { useNavigate } from "react-router-dom";

const PaquetesCreate = ({ onSave }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Distancia: "",
        Estado: "Detectado",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        Axios.post("https://54.208.187.128/detecciones/create", formData)
            .then((response) => {
                if (response.status === 201) {
                    onSave();
                    setFormData({
                        Distancia: "",
                        Estado: "Detectado",
                    });
                    alert("Detección de paquete creada exitosamente");
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error("Error creating data", error);
                setError("Hubo un problema al crear la detección de paquete. Inténtalo de nuevo.");
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
                        <h2 className="text-center mb-4">Agregar Producto</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="mb-3">
                                <label className="form-label">Distancia (cm):</label>
                                <input
                                    type="number"
                                    name="Distancia"
                                    value={formData.Distancia}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Estado:</label>
                                <select
                                    name="Estado"
                                    value={formData.Estado}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Detectado">Detectado</option>
                                    <option value="No detectado">No detectado</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaquetesCreate;