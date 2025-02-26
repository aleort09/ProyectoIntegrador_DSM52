import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DispositivosEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [dispositivo, setDispositivo] = useState({
        Tipo: "",
        Ubicacion: "",
        Estado: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/dispositivos/${id}`)
            .then(response => setDispositivo(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setDispositivo({ ...dispositivo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/dispositivos/edit/${id}`, dispositivo)
            .then(() => {
                alert("Dispositivo actualizado");
                navigate("/dispositivos");
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Editar Dispositivo</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">Tipo</label>
                    <select name="Tipo" value={dispositivo.Tipo} onChange={handleChange} className="form-select" required>
                        <option value="Sensor">Sensor</option>
                        <option value="Motor">Motor</option>
                        <option value="Cámara">Cámara</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Ubicación</label>
                    <input type="text" name="Ubicacion" value={dispositivo.Ubicacion} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <input type="text" name="Estado" value={dispositivo.Estado} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Dispositivo</button>
            </form>
        </div>
    );
};

export default DispositivosEdit;