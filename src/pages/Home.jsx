import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`http://localhost:3000/api/usuarios/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Error al obtener usuario:", error));
        }
    }, []);

    if (!user) return <p>Cargando datos del usuario...</p>;

    return (
        <div>
            <h2>Perfil del Usuario</h2>
            <p><strong>Nombre:</strong> {user.Nombre} {user.Apellido}</p>
            <p><strong>Correo:</strong> {user.Correo}</p>
            <p><strong>Teléfono:</strong> {user.Telefono}</p>
            <p><strong>Dirección:</strong> {user.Direccion}</p>
            <p><strong>Rol:</strong> {user.Rol}</p>
        </div>
    );
};

export default Home;
