import { Link } from "react-router-dom";
import axios from "axios";

const UniversidadList = ({ universidades, onUniversidadDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/universidades/delete/${id}`)
            .then(() => onUniversidadDeleted())
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Lista de Universidades</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Clave</th>
                        <th>Nombre</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {universidades.map(universidad => (
                        <tr key={universidad.id_uni}>
                            <td>{universidad.id_uni}</td>
                            <td>{universidad.clave}</td>
                            <td>{universidad.nombre}</td>
                            <td>{universidad.activo ? "Sí" : "No"}</td>
                            <td className="buttons">
                                <Link to={`/universidad/edit/${universidad.id_uni}`}><button className="verde">Editar</button></Link>
                                <button onClick={() => handleDelete(universidad.id_uni)} className="alert">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UniversidadList;
