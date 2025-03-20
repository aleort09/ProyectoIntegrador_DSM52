import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const PaquetesList = ({ packageDetections, onPackageDetectionDeleted, userRole }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPaquetes = packageDetections.slice(startIndex, endIndex);

    const totalPages = Math.ceil(packageDetections.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`https://54.208.187.128/detecciones/delete/${id}`)
                    .then(() => {
                        onPackageDetectionDeleted();
                        Swal.fire("¡Eliminado!", "El paquete ha sido eliminado.", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting package", error);
                        Swal.fire("Error", "No se pudo eliminar el paquete.", "error");
                    });
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Paquetes</h2>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Distancia (cm)</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        {userRole !== "Empleado" && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentPaquetes.map((paquete) => (
                        <tr key={paquete.ID_Deteccion}>
                            <td>{paquete.ID_Deteccion}</td>
                            <td>{paquete.Distancia}</td>
                            <td>{paquete.Estado}</td>
                            <td>{new Date(paquete.Fecha_Hora).toLocaleString()}</td>
                            {userRole !== "Empleado" && (
                                <td>
                                    <Link
                                        to={`/paquetes/edit/${paquete.ID_Deteccion}`}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(paquete.ID_Deteccion)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </button>
                            </li>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default PaquetesList;
