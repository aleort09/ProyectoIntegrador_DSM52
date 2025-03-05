import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

const Perfil = () => {
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

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <>
        <Menu/>
        <div
        className="p-4"
        style={{ marginLeft: "250px" }}
        >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Perfil del Usuario</h2>
                <button
                    className="btn btn-secondary"
                    onClick={handleGoBack}
                >
                    <i className="bi bi-arrow-left me-2"></i>Regresar
                </button>
            </div>
            <div className="card shadow">
                <div className="card-body">
                    <div className="mb-3">
                        <p className="mb-1"><strong>Nombre:</strong> {user.Nombre} {user.Apellido}</p>
                        <p className="mb-1"><strong>Correo:</strong> {user.Correo}</p>
                        <p className="mb-1"><strong>Teléfono:</strong> {user.Telefono}</p>
                        <p className="mb-1"><strong>Dirección:</strong> {user.Direccion}</p>
                        <p className="mb-0"><strong>Rol:</strong> {user.Rol}</p>
                    </div>
                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Perfil;