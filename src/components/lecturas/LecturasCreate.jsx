import { useState } from "react";
import axios from "axios";

const LecturasCreate = ({ onLecturaAdded }) => {
    const [lectura, setLectura] = useState({
        ID_Dispositivo: "",
        Tipo_Sensor: "Peso",
        Valor: "",
    });

    const handleChange = (e) => {
        setLectura({ ...lectura, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/lecturas_sensores/create", lectura)
            .then(() => {
                alert("Lectura registrada");
                onLecturaAdded();
                setLectura({
                    ID_Dispositivo: "",
                    Tipo_Sensor: "Peso",
                    Valor: "",
                });
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Crear Lectura de Sensor</h2>
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
                <button type="submit" className="btn btn-primary">Agregar Lectura</button>
            </form>
        </div>
    );
};

export default LecturasCreate;