import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import Menu from "../Menu";

const RemotosList = ({ remotos, setRemotos, onRemotoDeleted }) => {
    const userRole = localStorage.getItem("rol");
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    // Verificar que remotos sea un array
    const safeRemotos = Array.isArray(remotos) ? remotos : [];

    // Calcular el índice de inicio y fin para los remotos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRemotos = safeRemotos.slice(startIndex, endIndex); // Remotos de la página actual

    // Función para cambiar de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Función para eliminar un remoto
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
                // Solicitud DELETE para eliminar el remoto
                axios.delete(`https://ravendev.jeotech.x10.mx/remotos/delete/${id}`)
                    .then(() => {
                        setError(null);
                        onRemotoDeleted(); // Llamar la función que maneja la eliminación
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "El dato remoto ha sido eliminado.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        setError("No se pudo eliminar el dato remoto. Inténtelo de nuevo más tarde.");
                    });
            }
        });
    };

    // Calcular el número total de páginas
    const totalPages = Math.ceil(safeRemotos.length / itemsPerPage);

    return (
        <>
        <Menu />
        <div className="container mt-5">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>ID Detección</th>
                        <th>ID Clasificación</th>
                        <th>Estado Conexión</th>
                        <th>Fecha</th>
                        {userRole !== "Empleado" && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentRemotos.map((remoto) => (
                        <tr key={remoto.ID_Dato}>
                            <td>{remoto.ID_Dato}</td>
                            <td>{remoto.ID_Deteccion}</td>
                            <td>{remoto.ID_Clasificacion}</td>
                            <td>{remoto.Estado_Conexion}</td>
                            <td>{new Date(remoto.Fecha_Hora).toLocaleDateString()}</td>
                            {userRole !== "Empleado" && (
                                <td>
                                    <Link to={`/remotos/edit/${remoto.ID_Dato}`} className="btn btn-primary btn-sm me-2">
                                        <FaEdit className="icon-edit" />
                                    </Link>
                                    <button onClick={() => handleDelete(remoto.ID_Dato)} className="btn btn-danger btn-sm">
                                        <FaTrash className="icon-delete" />
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    Anterior
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Siguiente
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
        </>
    );
};

export default RemotosList;
