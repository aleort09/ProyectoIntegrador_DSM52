import { useState } from "react";
import axios from "axios";

const EventosCreate = ({ onEventoAdded }) => {
    const [evento, setEvento] = useState({
        ID_Dispositivo: "",
        Tipo_Evento: "",
        Descripcion: "",
    });

    const handleChange = (e) => {
        setEvento({ ...evento, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/eventos/create", evento)
            .then(() => {
                alert("Evento registrado");
                onEventoAdded();
                setEvento({
                    ID_Dispositivo: "",
                    Tipo_Evento: "",
                    Descripcion: "",
                });
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Crear Evento</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">ID Dispositivo</label>
                    <input type="text" name="ID_Dispositivo" value={evento.ID_Dispositivo} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de Evento</label>
                    <input type="text" name="Tipo_Evento" value={evento.Tipo_Evento} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea name="Descripcion" value={evento.Descripcion} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Evento</button>
            </form>
        </div>
    );
};

export default EventosCreate;