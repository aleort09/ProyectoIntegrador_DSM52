import { useState } from "react";
import axios from "axios";

const ClasificacionCreate = () => {
    const [formData, setFormData] = useState({
        ID_Producto: "",
        Etiqueta_Color: "Rojo",
        Accion: "Izquierda",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(
                "https://ravendev.jeotech.x10.mx/clasificaciones/create",
                formData
            );
            setMessage("Clasificación creada con éxito.");
            setFormData({ ID_Producto: "", Etiqueta_Color: "Rojo", Accion: "Izquierda" });
        } catch (err) {
            setError("Error al crear la clasificación.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Crear Clasificación de Paquete</h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">ID Producto:</label>
                    <input
                        type="number"
                        name="ID_Producto"
                        value={formData.ID_Producto}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Etiqueta de Color:</label>
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
                    <label className="form-label">Acción:</label>
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
    );
};

export default ClasificacionCreate;