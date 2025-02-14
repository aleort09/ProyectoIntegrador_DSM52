import { useState } from "react";
import axios from "axios";

const CarreraForm = ({ onCarreraAdded }) => {
    const [carrera, setCarrera] = useState({
        clave: "",
        nombre: "",
        activo: "1",
        id_uni: "",
    });

    const handleChange = (e) => {
        setCarrera({ ...carrera, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/api/carreras/create", carrera)
            .then(() => {
                alert("Carrera registrada");
                onCarreraAdded();
                setCarrera({
                    clave: "",
                    nombre: "",
                    activo: "1",
                    id_uni: "",
                });
            })
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="clave" placeholder="Clave" value={carrera.clave} onChange={handleChange} required />
            <input type="text" name="nombre" placeholder="Nombre" value={carrera.nombre} onChange={handleChange} required />
            <select name="activo" value={carrera.activo} onChange={handleChange} required>
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
            </select>
            <input type="text" name="id_uni" placeholder="ID Universidad" value={carrera.id_uni} onChange={handleChange} required />
            <button type="submit">Agregar Carrera</button>
        </form>
    );
};

export default CarreraForm;
