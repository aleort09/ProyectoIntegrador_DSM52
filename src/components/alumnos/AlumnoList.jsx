import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AlumnoList = ({ alumnos, setAlumnos, onAlumnoDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/alumnos/delete/${id}`)
            .then(() => {
                onAlumnoDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Lista de Alumnos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Matrícula</th>
                        <th>Alumno</th>
                        <th>Género</th>
                        <th>Sexo</th>
                        <th>Fecha Nacimiento</th>
                        <th>Email</th>
                        <th>Activo</th>
                        <th>ID Grupo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map(alumno => (
                        <tr key={alumno.id_alumno}>
                            <td>{alumno.id_alumno}</td>
                            <td>{alumno.matricula}</td>
                            <td>{`${alumno.nombre} ${alumno.app} ${alumno.apm}`}</td>
                            <td>{alumno.genero}</td>
                            <td>{alumno.sexo}</td>
                            <td>{alumno.fn}</td>
                            <td>{alumno.email}</td>
                            <td>{alumno.activo}</td>
                            <td>{alumno.id_grupo}</td>
                            <td className="buttons">
                                <Link to={`/alumno/edit/${alumno.id_alumno}`}><button className="verde">Editar</button></Link>
                                <button onClick={() => handleDelete(alumno.id_alumno)} className="alert">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AlumnoList;
