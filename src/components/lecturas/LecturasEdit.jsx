import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LecturasEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lectura, setLectura] = useState({
        ID_Dispositivo: "",
        Tipo_Sensor: "",
        Valor: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/lecturas_sensores/${id}`)
            .then(response => setLectura(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setLectura({ ...lectura, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/lecturas_sensores/edit/${id}`, lectura)
            .then(() => {
                alert("Lectura actualizada");
                navigate("/lecturas");
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Editar Lectura de Sensor</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">ID Dispositivo</label>
                    <input type="text" name="ID_Dispositivo" value={lectura.ID_Dispositivo} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de Sensor</label>
                    <select name="Tipo_Sensor" value={lectura.Tipo_Sensor} onChange={handleChange} className="form-select" required>
                        <option value="Peso">Peso</option>
                        <option value="Proximidad">Proximidad</option>
                        <option value="Temperatura">Temperatura</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Valor</label>
                    <input type="number" name="Valor" value={lectura.Valor} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar Lectura</button>
            </form>
        </div>
    );
};

export default LecturasEdit;