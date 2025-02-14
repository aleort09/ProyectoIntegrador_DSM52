import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CarreraEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [carrera, setCarrera] = useState({
        clave: "",
        nombre: "",
        activo: "1",
        id_uni: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/carreras/${id}`)
            .then(response => setCarrera(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setCarrera({ ...carrera, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/api/carreras/edit/${id}`, carrera)
            .then(() => {
                alert("Carrera actualizada");
                navigate("/carreras");
            })
            .catch(error => console.error(error));
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
            <button type="submit">Actualizar Carrera</button>
        </form>
    );
};

export default CarreraEdit;
