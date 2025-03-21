import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`https://ravendev.jeotech.x10.mx/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Error al obtener usuario:", error));
        }
    }, []);

    if (!user) return <p className="loading-text">Cargando datos del usuario...</p>;

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h1>Bienvenido, {user.Nombre} {user.Apellido}</h1>
                <p>Aquí tienes un resumen de tu actividad:</p>
            </div>
        </>
    );
};

export default Home;