import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EventosList = ({ eventos, setEventos, onEventoDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/eventos/delete/${id}`)
            .then(() => {
                onEventoDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Eventos</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Dispositivo</th>
                        <th>Tipo de Evento</th>
                        <th>Descripción</th>
                        <th>Fecha y Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map(evento => (
                        <tr key={evento.ID_Evento}>
                            <td>{evento.ID_Evento}</td>
                            <td>{evento.ID_Dispositivo}</td>
                            <td>{evento.Tipo_Evento}</td>
                            <td>{evento.Descripcion}</td>
                            <td>{new Date(evento.Fecha_Hora).toLocaleString()}</td>
                            <td>
                                <Link to={`/eventos/edit/${evento.ID_Evento}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(evento.ID_Evento)} className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default EventosList;