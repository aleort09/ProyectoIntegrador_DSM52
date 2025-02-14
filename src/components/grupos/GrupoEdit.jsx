import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GrupoEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [grupo, setGrupo] = useState({
        clave: "",
        nombre: "",
        activo: 1,
        id_carrera: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/grupos/${id}`)
            .then(response => setGrupo(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setGrupo({ ...grupo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/api/grupos/edit/${id}`, grupo)
            .then(() => {
                alert("Grupo actualizado");
                navigate("/grupos");
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="clave" placeholder="Clave" value={grupo.clave} onChange={handleChange} required />
            <input type="text" name="nombre" placeholder="Nombre" value={grupo.nombre} onChange={handleChange} required />
            <select name="activo" value={grupo.activo} onChange={handleChange} required>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
            <input type="text" name="id_carrera" placeholder="ID Carrera" value={grupo.id_carrera} onChange={handleChange} required />
            <button type="submit">Actualizar Grupo</button>
        </form>
    );
};

export default GrupoEdit;
