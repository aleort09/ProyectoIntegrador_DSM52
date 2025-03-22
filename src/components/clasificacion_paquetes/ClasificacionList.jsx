import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import Menu from "../Menu";
import ClasificacionChart from "../charts/ClasificacionChart";

const ClasificacionList = ({ packageClassifications, setPackageClassifications, onPackageClassificationDeleted }) => {
    const userRole = localStorage.getItem("rol");
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [error, setError] = useState(null); // Estado para manejar errores
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const itemsPerPage = 10; // Número de clasificaciones por página

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPkg = packageClassifications.slice(startIndex, endIndex); // Clasificaciones de la página actual

    // Función para cambiar de página
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
                setLoading(true);
                axios
                    .delete(`https://ravendev.jeotech.x10.mx/clasificaciones/delete/${id}`)
                    .then(() => {
                        setError(null); // Limpiar el error si la solicitud es exitosa
                        onPackageClassificationDeleted(); // Llamar a la función de actualización
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "La clasificación ha sido eliminada.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setError("No se pudo eliminar la clasificación. Inténtelo de nuevo más tarde.");
                        setLoading(false);
                    });
            }
        });
    };

    const totalPages = Math.ceil(packageClassifications.length / itemsPerPage);

    return (
        <>
            <Menu />
            <div className="container mt-5">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                {loading && <div className="text-center">Cargando...</div>}
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>ID Producto</th>
                            <th>Etiqueta Color</th>
                            <th>Acción</th>
                            <th>Fecha</th>
                            {userRole !== "Empleado" && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentPkg.length > 0 ? (
                            currentPkg.map((clasificacion) => (
                                <tr key={clasificacion.ID_Clasificacion}>
                                    <td>{clasificacion.ID_Clasificacion}</td>
                                    <td>{clasificacion.ID_Producto}</td>
                                    <td>{clasificacion.Etiqueta_Color}</td>
                                    <td>{clasificacion.Accion}</td>
                                    <td>{new Date(clasificacion.Fecha_Hora).toLocaleString()}</td>
                                    {userRole !== "Empleado" && (
                                        <td>
                                            <Link
                                                to={`/clasificacion_paquetes/edit/${clasificacion.ID_Clasificacion}`}
                                                className="btn btn-primary btn-sm me-2"
                                            >
                                                <FaEdit className="icon-edit" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(clasificacion.ID_Clasificacion)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <FaTrash className="icon-delete" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No hay clasificaciones registradas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
                {/* Gráfica de clasificaciones */}
                <div className="mt-5">
                    <h4 className="text-center mb-4">Gráfica de Clasificaciones</h4>
                    <ClasificacionChart clasificaciones={packageClassifications} />
                </div>
            </div>
        </>
    );
};

export default ClasificacionList;