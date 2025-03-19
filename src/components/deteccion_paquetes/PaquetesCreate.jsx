import React, { useState } from "react";
import Axios from "axios";

const PaquetesCreate = ({ onSave }) => {
    const [formData, setFormData] = useState({
        Distancia: "",
        Estado: "Detectado",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    return (
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
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
            </button>
        </form>
    );
};

export default PaquetesCreate;