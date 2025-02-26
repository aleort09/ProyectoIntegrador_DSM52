import { useNavigate } from "react-router-dom";
import LecturasList from "../components/lecturas/LecturasList";
import LecturasCreate from "../components/lecturas/LecturasCreate";
import { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Menu from "../components/Menu";

const HomeLecturas = () => {
    const navigate = useNavigate();
    const [lecturas, setLecturas] = useState([]);

    useEffect(() => {
        fetchLecturas();
    }, []);

    const fetchLecturas = () => {
        axios.get("http://localhost:3000/api/lecturas")
            .then(response => setLecturas(response.data))
            .catch(error => console.error(error));
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Lecturas</h1>
                <LecturasCreate onLecturaAdded={fetchLecturas} />
                <LecturasList lecturas={lecturas} setLecturas={setLecturas} />
            </div>
        </>
    );
};
export default HomeLecturas;
