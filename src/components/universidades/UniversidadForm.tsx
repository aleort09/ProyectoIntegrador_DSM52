import { useState } from "react";
import axios from "axios";

const UniversidadForm = ({ onUniversidadAdded }) => {
    const [universidad, setUniversidad] = useState({
        clave: "",
        nombre: "",
        activo: 1,
    });

    const handleChange = (e) => {
        setUniversidad({ ...universidad, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:3000/api/universidades/create", universidad)
            .then(() => {
                alert("Universidad registrada");
                onUniversidadAdded();
                setUniversidad({ clave: "", nombre: "", activo: 1 });
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="clave" placeholder="Clave" value={universidad.clave} onChange={handleChange} required />
            <input type="text" name="nombre" placeholder="Nombre" value={universidad.nombre} onChange={handleChange} required />
            <select name="activo" value={universidad.activo} onChange={handleChange} required>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
            <button type="submit">Agregar Universidad</button>
        </form>
    );
};

export default UniversidadForm;
