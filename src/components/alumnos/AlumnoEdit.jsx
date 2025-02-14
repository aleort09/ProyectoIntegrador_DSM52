import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AlumnoEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [alumno, setAlumno] = useState({
        matricula: "",
        nombre: "",
        app: "",
        apm: "",
        genero: "F",
        sexo: "F",
        fn: "",
        email: "",
        activo: "",
        id_grupo: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/api/alumnos/${id}`)
            .then(response => setAlumno(response.data))
            .catch(error => console.error(error));
            
    }, [id]);

    const handleChange = (e) => {
        setAlumno({ ...alumno, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Datos actualizados:", alumno);
    
        axios.put(`http://localhost:3000/api/alumnos/edit/${id}`, alumno)
            .then(() => {
                alert("Alumno actualizado");
                navigate("/alumnos");
            })
            .catch(error => console.error(error));
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="matricula" placeholder="Matricula" value={alumno.matricula} onChange={handleChange} required />
            <input type="text" name="nombre" placeholder="Nombre" value={alumno.nombre} onChange={handleChange} required />
            <input type="text" name="app" placeholder="Apellido Paterno" value={alumno.app} onChange={handleChange} required />
            <input type="text" name="apm" placeholder="Apellido Materno" value={alumno.apm} onChange={handleChange} required />
            <select name="genero" value={alumno.genero} onChange={handleChange} required>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
            </select>
            <select name="sexo" value={alumno.sexo} onChange={handleChange} required>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
            </select>
            <input type="date" name="fn" value={alumno.fn} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo Electrónico" value={alumno.email} onChange={handleChange} required />
            <input type="text" name="activo" placeholder="Activo" value={alumno.activo} onChange={handleChange} required />
            <input type="text" name="id_grupo" placeholder="ID Grupo" value={alumno.id_grupo} onChange={handleChange} required />
            <button type="submit">Actualizar Alumno</button>
        </form>
    );
};

export default AlumnoEdit;
