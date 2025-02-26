import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LecturasList = ({ lecturas, setLecturas, onLecturaDeleted }) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 10; // Número de lecturas por página

    // Calcular el índice de inicio y fin para las lecturas de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLecturas = lecturas.slice(startIndex, endIndex); // Lecturas de la página actual

    // Función para cambiar de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Función para eliminar una lectura
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/lecturas_sensores/delete/${id}`)
            .then(() => {
                onLecturaDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Lecturas de Sensores</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Dispositivo</th>
                        <th>Tipo de Sensor</th>
                        <th>Valor</th>
                        <th>Fecha y Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLecturas.map(lectura => (
                        <tr key={lectura.ID_Lectura}>
                            <td>{lectura.ID_Lectura}</td>
                            <td>{lectura.ID_Dispositivo}</td>
                            <td>{lectura.Tipo_Sensor}</td>
                            <td>{lectura.Valor}</td>
                            <td>{new Date(lectura.Fecha_Hora).toLocaleString()}</td>
                            <td>
                                <Link to={`/lecturas/edit/${lectura.ID_Lectura}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(lectura.ID_Lectura)} className="btn btn-danger btn-sm">Eliminar</button>
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
                        {Array.from({ length: Math.ceil(lecturas.length / itemsPerPage) }, (_, i) => (
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
                        <li className={`page-item ${currentPage === Math.ceil(lecturas.length / itemsPerPage) ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(lecturas.length / itemsPerPage)}
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

export default LecturasList;