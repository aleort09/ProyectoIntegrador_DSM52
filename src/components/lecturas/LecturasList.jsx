import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LecturasList = ({ lecturas, setLecturas, onLecturaDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/lecturas_sensores/delete/${id}`)
            .then(() => {
                onLecturaDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Lecturas de Sensores</h2>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Dispositivo</th>
                        <th>Tipo de Sensor</th>
                        <th>Valor</th>
                        <th>Fecha y Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lecturas.map(lectura => (
                        <tr key={lectura.ID_Lectura}>
                            <td>{lectura.ID_Lectura}</td>
                            <td>{lectura.ID_Dispositivo}</td>
                            <td>{lectura.Tipo_Sensor}</td>
                            <td>{lectura.Valor}</td>
                            <td>{new Date(lectura.Fecha_Hora).toLocaleString()}</td>
                            <td>
                                <Link to={`/lecturas/edit/${lectura.ID_Lectura}`} className="btn btn-primary btn-sm me-2">Editar</Link>
                                <button onClick={() => handleDelete(lectura.ID_Lectura)} className="btn btn-danger btn-sm">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default LecturasList;