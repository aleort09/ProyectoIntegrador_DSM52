import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProductosChart from "../charts/ProductosChart";
import Menu from "../Menu";

const ProductosList = ({ productos, setProductos, onProductoDeleted }) => {
    const userRole = localStorage.getItem("rol");
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProductos = productos.slice(startIndex, endIndex);

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
                    .delete(`https://ravendev.jeotech.x10.mx/productos/delete/${id}`)
                    .then(() => {
                        setError(null);
                        onProductoDeleted();
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "El producto ha sido eliminado.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setError("No se pudo eliminar el Producto. Inténtelo de nuevo más tarde.");
                        setLoading(false);
                    });
            }
        });
    };

    const totalPages = Math.ceil(productos.length / itemsPerPage);

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
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Fecha de Registro</th>
                            {userRole !== "Empleado" && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentProductos.map((producto) => (
                            <tr key={producto.ID_Producto}>
                                <td>{producto.ID_Producto}</td>
                                <td>{producto.Nombre}</td>
                                <td>{producto.Stock}</td>
                                <td>{new Date(producto.Fecha_Registro).toLocaleDateString()}</td>
                                {userRole !== "Empleado" && (
                                    <td>
                                        <Link
                                            to={`/productos/edit/${producto.ID_Producto}`}
                                            className="btn btn-primary btn-sm me-2"
                                        >
                                            <FaEdit className="icon-edit" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(producto.ID_Producto)}
                                            className="btn btn-danger btn-sm"
                                        >
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
                <ProductosChart productos={productos} />
            </div>
        </>
    );
};

export default ProductosList;