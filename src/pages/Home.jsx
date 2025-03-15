import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
    const [user, setUser] = useState(null);
    const [dispositivos, setDispositivos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            // Obtener datos del usuario
            axios.get(`http://localhost:3000/api/usuarios/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Error al obtener usuario:", error));

            // Obtener dispositivos asociados al usuario
            axios.get(`http://localhost:3000/api/usuarios/${userId}/dispositivos`)
                .then(response => setDispositivos(response.data))
                .catch(error => console.error("Error al obtener dispositivos:", error));

            // Obtener eventos recientes del usuario
            axios.get(`http://localhost:3000/api/usuarios/${userId}/eventos`)
                .then(response => setEventos(response.data))
                .catch(error => console.error("Error al obtener eventos:", error));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    if (!user) return <p className="loading-text">Cargando datos del usuario...</p>;

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h1>Bienvenido, {user.Nombre} {user.Apellido}</h1>
                <p>Aquí tienes un resumen de tu actividad:</p>

                {/* Dispositivos asociados */}
                <div className="card mb-4">
                    <div className="card-header">
                        <h5>Dispositivos Asociados</h5>
                    </div>
                    <div className="card-body">
                        {dispositivos.length > 0 ? (
                            <ul className="list-group">
                                {dispositivos.map(dispositivo => (
                                    <li key={dispositivo.id} className="list-group-item">
                                        {dispositivo.nombre} - {dispositivo.estado}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No tienes dispositivos asociados.</p>
                        )}
                    </div>
                </div>

                {/* Eventos recientes */}
                <div className="card mb-4">
                    <div className="card-header">
                        <h5>Eventos Recientes</h5>
                    </div>
                    <div className="card-body">
                        {eventos.length > 0 ? (
                            <ul className="list-group">
                                {eventos.map(evento => (
                                    <li key={evento.id} className="list-group-item">
                                        {evento.descripcion} - {new Date(evento.fecha).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay eventos recientes.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;