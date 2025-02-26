import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DispositivosList = ({ dispositivos, setDispositivos, onDispositivoDeleted }) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 10; // Número de dispositivos por página

    // Calcular el índice de inicio y fin para los dispositivos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDispositivos = dispositivos.slice(startIndex, endIndex); // Dispositivos de la página actual

    // Función para cambiar de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Función para eliminar un dispositivo
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/dispositivos/delete/${id}`)
            .then(() => {
                onDispositivoDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Dispositivos</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDispositivos.map(dispositivo => (
                        <tr key={dispositivo.ID_Dispositivo}>
                            <td>{dispositivo.ID_Dispositivo}</td>
                            <td>{dispositivo.Tipo}</td>
                            <td>{dispositivo.Ubicacion}</td>
                            <td>{dispositivo.Estado}</td>
                            <td>{new Date(dispositivo.Fecha_Registro).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/dispositivos/edit/${dispositivo.ID_Dispositivo}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(dispositivo.ID_Dispositivo)} className="btn btn-danger btn-sm">Eliminar</button>
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
                        {Array.from({ length: Math.ceil(dispositivos.length / itemsPerPage) }, (_, i) => (
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
                        <li className={`page-item ${currentPage === Math.ceil(dispositivos.length / itemsPerPage) ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(dispositivos.length / itemsPerPage)}
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

export default DispositivosList;