import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventosEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [evento, setEvento] = useState({
        ID_Dispositivo: "",
        Tipo_Evento: "",
        Descripcion: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/eventos/${id}`)
            .then(response => setEvento(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setEvento({ ...evento, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/eventos/edit/${id}`, evento)
            .then(() => {
                alert("Evento actualizado");
                navigate("/eventos");
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Editar Evento</h2>
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
                <button type="submit" className="btn btn-primary">Actualizar Evento</button>
            </form>
        </div>
    );
};

export default EventosEdit;