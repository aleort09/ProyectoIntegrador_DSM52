import { useNavigate } from "react-router-dom";
import DispositivosList from "../components/dispositivos/DispositivosList";
import DispositivosCreate from "../components/dispositivos/DispositivosCreate";
import { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Menu from "../components/Menu";

const HomeDispositivos = () => {
    const navigate = useNavigate();
    const [dispositivos, setDispositivos] = useState([]);

    useEffect(() => {
        fetchDispositivos();
    }, []);

    const fetchDispositivos = () => {
        axios.get("http://localhost:3000/api/dispositivos")
            .then(response => setDispositivos(response.data))
            .catch(error => console.error(error));
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Dispositivos</h1>
                <DispositivosCreate onDispositivoAdded={fetchDispositivos} />
                <DispositivosList dispositivos={dispositivos} setDispositivos={setDispositivos} />
            </div>
        </>
    );
};
export default HomeDispositivos;