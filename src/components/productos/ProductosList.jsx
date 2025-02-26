import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductosList = ({ productos, setProductos, onProductoDeleted }) => {
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
                    {productos.map(producto => (
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
        </div>
    );
};
export default ProductosList;