import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UsuariosList = ({ usuarios, setUsuarios, onUsuarioDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/usuarios/delete/${id}`)
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
                    {usuarios.map(usuario => (
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
        </div>
    );
};
export default UsuariosList;