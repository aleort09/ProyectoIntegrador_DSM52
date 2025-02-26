import { useNavigate } from "react-router-dom";
import EventosList from "../components/eventos/EventosList";
import EventosCreate from "../components/eventos/EventosCreate";
import { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Menu from "../components/Menu";

const HomeEventos = () => {
    const navigate = useNavigate();
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = () => {
        axios.get("http://localhost:3000/api/eventos")
            .then(response => setEventos(response.data))
            .catch(error => console.error(error));
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Eventos</h1>
                <EventosCreate onEventoAdded={fetchEventos} />
                <EventosList eventos={eventos} setEventos={setEventos} />
            </div>
        </>
    );
};
export default HomeEventos;