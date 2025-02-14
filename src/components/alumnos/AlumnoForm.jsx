import { useState } from "react";
import axios from "axios";

const AlumnoForm = ({ onAlumnoAdded }) => {
    const [alumno, setAlumno] = useState({
        matricula: "",
        nombre: "",
        app: "",
        apm: "",
        genero: "Femenino",
        sexo: "Femenino",
        fn: "",
        email: "",
        activo: "",
        id_grupo: "",
    });

    const handleChange = (e) => {
        setAlumno({ ...alumno, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Datos enviados:", alumno);  // Verifica antes de enviar
    
        axios.post("http://localhost:3000/api/alumnos/create", alumno)
            .then(() => {
                alert("Alumno registrado");
                onAlumnoAdded();
                setAlumno({
                    matricula: "",
                    nombre: "",
                    app: "",
                    apm: "",
                    genero: "F", // Asegura valores por defecto
                    sexo: "F",
                    fn: "",
                    email: "",
                    activo: "",
                    id_grupo: "",
                });
            })
            .catch((error) => console.error(error));
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
            <button type="submit">Agregar Alumno</button>
        </form>
    );
};

export default AlumnoForm;
