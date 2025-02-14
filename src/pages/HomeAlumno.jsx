import { useNavigate } from "react-router-dom";
import AlumnoList from "../components/alumnos/AlumnoList";
import AlumnoForm from "../components/alumnos/AlumnoForm";
import { useEffect, useState } from "react";
import '../App.css'
import axios from "axios";
import Menu from "../components/menu";

const HomeAlumno = () => {
    const navigate = useNavigate();

    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
        fetchAlumnos();
    }, []);

    const fetchAlumnos = () => {
        axios.get("http://localhost:3000/api/alumnos")
            .then(response => setAlumnos(response.data))
            .catch(error => console.error(error));
    };

    const handleAlumnoAdded = () => {
        fetchAlumnos();
    };

    const handleAlumnoDeleted = () => {
        fetchAlumnos();
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Alumnos</h1>
                <AlumnoForm onAlumnoAdded={handleAlumnoAdded} />
                <AlumnoList alumnos={alumnos} setAlumnos={setAlumnos} onAlumnoDeleted={handleAlumnoDeleted} />
            </div>
        </>
    );
};
export default HomeAlumno;
