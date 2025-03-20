import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import Menu from "../Menu";

const UsuariosList = ({ usuarios, setUsuarios, onUsuarioDeleted, userRole }) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [error, setError] = useState(null); // Estado para manejar errores
    const itemsPerPage = 10; // Número de usuarios por página

    // Calcular el índice de inicio y fin para los usuarios de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsuarios = usuarios.slice(startIndex, endIndex); // Usuarios de la página actual

    // Función para cambiar de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Función para eliminar un usuario
    const handleDelete = (id) => {
        // Mostrar confirmación antes de eliminar
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
                // Si el usuario confirma, hacer la solicitud DELETE
                axios.delete(`https://54.208.187.128/users/delete/${id}`)
                    .then(() => {
                        setError(null); // Limpiar el error si la solicitud es exitosa
                        onUsuarioDeleted(); // Llamar a la función de actualización

                        // Mostrar mensaje de éxito
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "El usuario ha sido eliminado.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        setError("No se pudo eliminar el usuario. Inténtelo de nuevo más tarde."); // Mostrar mensaje de error
                    });
            }
        });
    };

    // Calcular el número total de páginas
    const totalPages = Math.ceil(usuarios.length / itemsPerPage);

    return (
        <>
        <Menu/>
        <div className="container mt-5">
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Rol</th>
                        <th>Fecha de Registro</th>
                        {userRole !== "empleado" && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map((usuario) => (
                        <tr key={usuario.ID_Usuario}>
                            <td>{usuario.ID_Usuario}</td>
                            <td>{usuario.Nombre}</td>
                            <td>{usuario.Apellido}</td>
                            <td>{usuario.Correo}</td>
                            <td>{usuario.Telefono}</td>
                            <td>{usuario.Direccion}</td>
                            <td>{usuario.Rol}</td>
                            <td>{new Date(usuario.Fecha_Registro).toLocaleDateString()}</td>
                            {/* Mostrar acciones solo si el rol no es "empleado" */}
                            {userRole !== "empleado" && (
                                <td>
                                    <Link
                                        to={`/usuarios/edit/${usuario.ID_Usuario}`}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        <FaEdit className="icon-edit" /> {/* Icono de editar */}
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(usuario.ID_Usuario)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        <FaTrash className="icon-delete" /> {/* Icono de eliminar */}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación (solo si hay más de una página) */}
            {totalPages > 1 && (
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

                            {/* Botón "Siguiente" */}
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
        </>
        
    );
};

export default UsuariosList;