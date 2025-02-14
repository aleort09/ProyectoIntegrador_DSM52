import CarreraList from "../components/carreras/CarreraList";
import CarreraForm from "../components/carreras/CarreraForm";
import { useEffect, useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/menu";

const HomeCarrera = () => {
    const navigate = useNavigate();

    const [carreras, setCarreras] = useState([]);

    useEffect(() => {
        fetchCarreras();
    }, []);

    const fetchCarreras = () => {
        axios.get("http://localhost:3000/api/carreras")
            .then(response => setCarreras(response.data))
            .catch(error => console.error(error));
    };

    const handleCarreraAdded = () => {
        fetchCarreras();
    };

    const handleCarreraDeleted = () => {
        fetchCarreras();
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Carreras</h1>
                <CarreraForm onCarreraAdded={handleCarreraAdded} />
                <CarreraList carreras={carreras} setCarreras={setCarreras} onCarreraDeleted={handleCarreraDeleted} />
            </div>
        </>
    );
};

export default HomeCarrera;
