import { Link } from "react-router-dom";
import axios from "axios";

const GrupoList = ({ grupos, onGrupoDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/grupos/delete/${id}`)
            .then(() => onGrupoDeleted())
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Lista de Grupos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Clave</th>
                        <th>Nombre</th>
                        <th>Activo</th>
                        <th>ID Carrera</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {grupos.map(grupo => (
                        <tr key={grupo.id_grupo}>
                            <td>{grupo.id_grupo}</td>
                            <td>{grupo.clave}</td>
                            <td>{grupo.nombre}</td>
                            <td>{grupo.activo ? "Sí" : "No"}</td>
                            <td>{grupo.id_carrera}</td>
                            <td className="buttons">
                                <Link to={`/grupo/edit/${grupo.id_grupo}`}><button className="verde">Editar</button></Link>
                                <button onClick={() => handleDelete(grupo.id_grupo)} className="alert">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GrupoList;
