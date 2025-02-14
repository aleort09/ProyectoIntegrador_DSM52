import { Link } from "react-router-dom";
import axios from "axios";

const CarreraList = ({ carreras, setCarreras, onCarreraDeleted }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/carreras/delete/${id}`)
            .then(() => {
                onCarreraDeleted();
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Lista de Carreras</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Clave</th>
                        <th>Nombre</th>
                        <th>Activo</th>
                        <th>ID Universidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {carreras.map(carrera => (
                        <tr key={carrera.id_carrera}>
                            <td>{carrera.id_carrera}</td>
                            <td>{carrera.clave}</td>
                            <td>{carrera.nombre}</td>
                            <td>{carrera.activo ? "Sí" : "No"}</td>
                            <td>{carrera.id_uni}</td>
                            <td className="buttons">
                                <Link to={`/carrera/edit/${carrera.id_carrera}`}><button className="verde">Editar</button></Link>
                                <button onClick={() => handleDelete(carrera.id_carrera)} className="alert">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarreraList;
