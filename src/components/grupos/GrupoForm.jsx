import { useState } from "react";
import axios from "axios";

const GrupoForm = ({ onGrupoAdded }) => {
    const [grupo, setGrupo] = useState({
        clave: "",
        nombre: "",
        activo: 1,
        id_carrera: "",
    });

    const handleChange = (e) => {
        setGrupo({ ...grupo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:3000/api/grupos/create", grupo)
            .then(() => {
                alert("Grupo registrado");
                onGrupoAdded();
                setGrupo({ clave: "", nombre: "", activo: 1, id_carrera: "" });
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
            <button type="submit">Agregar Grupo</button>
        </form>
    );
};

export default GrupoForm;
