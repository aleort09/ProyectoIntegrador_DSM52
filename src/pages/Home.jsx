import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`https://54.208.187.128/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Error al obtener usuario:", error));
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
                <h1>Bienvenido, {user.nombre} {user.Apellido}</h1>
                <p>Aquí tienes un resumen de tu actividad:</p>
            </div>
        </>
    );
};

export default Home;