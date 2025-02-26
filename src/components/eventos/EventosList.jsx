import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EventosList = ({ eventos, setEventos, onEventoDeleted }) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 10; // Número de eventos por página

    // Calcular el índice de inicio y fin para los eventos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEventos = eventos.slice(startIndex, endIndex); // Eventos de la página actual

    // Función para cambiar de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Función para eliminar un evento
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
                    {currentEventos.map(evento => (
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

            {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination">
                        {/* Botón "Anterior" */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                        </li>

                        {/* Números de página */}
                        {Array.from({ length: Math.ceil(eventos.length / itemsPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        {/* Botón "Siguiente" */}
                        <li className={`page-item ${currentPage === Math.ceil(eventos.length / itemsPerPage) ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(eventos.length / itemsPerPage)}
                            >
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default EventosList;