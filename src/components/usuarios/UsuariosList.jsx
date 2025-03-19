import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UsuariosList = ({ usuarios, setUsuarios, onUsuarioDeleted }) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
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
        axios.delete(`https://54.208.187.128/users/delete/${id}`)
            .then(() => {
                onUsuarioDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Usuarios</h2>
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsuarios.map(usuario => (
                        <tr key={usuario.ID_Usuario}>
                            <td>{usuario.ID_Usuario}</td>
                            <td>{usuario.Nombre}</td>
                            <td>{usuario.Apellido}</td>
                            <td>{usuario.Correo}</td>
                            <td>{usuario.Telefono}</td>
                            <td>{usuario.Direccion}</td>
                            <td>{usuario.Rol}</td>
                            <td>{new Date(usuario.Fecha_Registro).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/usuarios/edit/${usuario.ID_Usuario}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(usuario.ID_Usuario)} className="btn btn-danger btn-sm">Eliminar</button>
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
                        {Array.from({ length: Math.ceil(usuarios.length / itemsPerPage) }, (_, i) => (
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
                        <li className={`page-item ${currentPage === Math.ceil(usuarios.length / itemsPerPage) ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(usuarios.length / itemsPerPage)}
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

export default UsuariosList;