import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ClasificacionEdit = () => {
    const { classification_id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ID_Producto: "",
        Etiqueta_Color: "Rojo",
        Accion: "Izquierda",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://54.208.187.128/clasificaciones/${classification_id}`
                );
                setFormData(response.data);
            } catch (err) {
                setError("Error al cargar la clasificación.");
            }
        };
        fetchData();
    }, [classification_id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            await axios.put(
                `https://54.208.187.128/clasificaciones/edit/${classification_id}`,
                formData
            );
            setMessage("Clasificación actualizada con éxito.");
            navigate("/clasificaciones"); // Redirigir a la lista de clasificaciones
        } catch (err) {
            setError("Error al actualizar la clasificación.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Editar Clasificación de Paquete</h2>

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
                    Actualizar Clasificación
                </button>
            </form>
        </div>
    );
};

export default ClasificacionEdit;