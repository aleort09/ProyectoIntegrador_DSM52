import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductosList = ({ productos, setProductos, onProductoDeleted }) => {
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const itemsPerPage = 10; // Número de productos por página

    // Calcular el índice de inicio y fin para los productos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProductos = productos.slice(startIndex, endIndex); // Productos de la página actual

    // Función para cambiar de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Función para eliminar un producto
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/paquetes/delete/${id}`)
            .then(() => {
                onProductoDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Paquetes</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Peso</th>
                        <th>Dimensiones</th>
                        <th>Destino</th>
                        <th>Estado</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProductos.map(producto => (
                        <tr key={producto.ID_Paquete}>
                            <td>{producto.ID_Paquete}</td>
                            <td>{producto.ID_Usuario}</td>
                            <td>{producto.Peso} kg</td>
                            <td>{producto.Dimensiones}</td>
                            <td>{producto.Destino}</td>
                            <td>{producto.Estado}</td>
                            <td>{new Date(producto.Fecha_Registro).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/productos/edit/${producto.ID_Paquete}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(producto.ID_Paquete)} className="btn btn-danger btn-sm">Eliminar</button>
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
                        {Array.from({ length: Math.ceil(productos.length / itemsPerPage) }, (_, i) => (
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
                        <li className={`page-item ${currentPage === Math.ceil(productos.length / itemsPerPage) ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(productos.length / itemsPerPage)}
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

export default ProductosList;