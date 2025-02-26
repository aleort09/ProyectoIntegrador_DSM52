import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../components/App.css';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`http://localhost:3000/api/usuarios/${userId}`)
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
        <div className="user-details-container">
            <h2>Perfil del Usuario</h2>
            <div className="user-details">
                <p><strong>Nombre:</strong> {user.Nombre} {user.Apellido}</p>
                <p><strong>Correo:</strong> {user.Correo}</p>
                <p><strong>Teléfono:</strong> {user.Telefono}</p>
                <p><strong>Dirección:</strong> {user.Direccion}</p>
                <p><strong>Rol:</strong> {user.Rol}</p>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );

};

export default Home;
