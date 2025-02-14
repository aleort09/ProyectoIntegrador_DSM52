import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UniversidadEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [universidad, setUniversidad] = useState({
        clave: "",
        nombre: "",
        activo: 1,
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/universidades/${id}`)
            .then(response => setUniversidad(response.data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setUniversidad({ ...universidad, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3000/api/universidades/edit/${id}`, universidad)
            .then(() => {
                alert("Universidad actualizada");
                navigate("/universidades");
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
            <button type="submit">Actualizar Universidad</button>
        </form>
    );
};

export default UniversidadEdit;
