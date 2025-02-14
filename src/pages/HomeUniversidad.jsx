import UniversidadList from "../components/universidades/UniversidadList";
import UniversidadForm from "../components/universidades/UniversidadForm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../components/menu";

const HomeUniversidad = () => {
    const navigate = useNavigate();
    const [universidades, setUniversidades] = useState([]);

    useEffect(() => {
        fetchUniversidades();
    }, []);

    const fetchUniversidades = () => {
        axios.get("http://localhost:3000/api/universidades")
            .then(response => setUniversidades(response.data))
            .catch(error => console.error(error));
    };

    const handleUniversidadAdded = () => {
        fetchUniversidades();
    };

    const handleUniversidadDeleted = () => {
        fetchUniversidades();
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Universidades</h1>
                <UniversidadForm onUniversidadAdded={handleUniversidadAdded} />
                <UniversidadList universidades={universidades} onUniversidadDeleted={handleUniversidadDeleted} />

            </div>
        </>

    );
};

export default HomeUniversidad;
