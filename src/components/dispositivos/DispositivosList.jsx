import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DispositivosList = ({ dispositivos, setDispositivos, onDispositivoDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/dispositivos/delete/${id}`)
            .then(() => {
                onDispositivoDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Dispositivos</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {dispositivos.map(dispositivo => (
                        <tr key={dispositivo.ID_Dispositivo}>
                            <td>{dispositivo.ID_Dispositivo}</td>
                            <td>{dispositivo.Tipo}</td>
                            <td>{dispositivo.Ubicacion}</td>
                            <td>{dispositivo.Estado}</td>
                            <td>{new Date(dispositivo.Fecha_Registro).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/dispositivos/edit/${dispositivo.ID_Dispositivo}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(dispositivo.ID_Dispositivo)} className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default DispositivosList;