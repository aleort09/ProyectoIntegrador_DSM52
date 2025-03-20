import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";

const Perfil = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`https://54.208.187.128/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Error al obtener usuario:", error));
        }
    }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const containerStyle = {
        marginLeft: isMobile ? "0" : "205px",
        marginTop: isMobile ? "30px" : "0",
        padding: "5px",
        transition: "all 0.3s ease",
        animation: "fadeIn 1s ease"
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
            <Menu />
            <div className="container mt-5" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="fw-bold">
                                <i className="bi bi-person-circle me-2 text-primary"></i>
                                Perfil del Usuario
                            </h2>
                            <button className="btn btn-outline-secondary" onClick={handleGoBack}>
                                <i className="bi bi-arrow-left me-2"></i> Regresar
                            </button>
                        </div>

                        <div className="card shadow-lg border-0">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <i className="bi bi-person-fill me-2 text-primary"></i>
                                        <strong>Nombre:</strong> {user.Nombre} {user.Apellido}
                                    </li>
                                    <li className="list-group-item">
                                        <i className="bi bi-envelope-fill me-2 text-success"></i>
                                        <strong>Correo:</strong> {user.Correo}
                                    </li>
                                    <li className="list-group-item">
                                        <i className="bi bi-telephone-fill me-2 text-info"></i>
                                        <strong>Teléfono:</strong> {user.Telefono}
                                    </li>
                                    <li className="list-group-item">
                                        <i className="bi bi-geo-alt-fill me-2 text-warning"></i>
                                        <strong>Dirección:</strong> {user.Direccion}
                                    </li>
                                    <li className="list-group-item">
                                        <i className="bi bi-shield-lock-fill me-2 text-danger"></i>
                                        <strong>Rol:</strong> {user.Rol}
                                    </li>
                                </ul>
                                <div className="text-end mt-4">
                                    <button className="btn btn-danger" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Estilos personalizados */}
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    .card:hover {
                        transform: scale(1.02);
                        box-shadow: 0 0 15px rgba(0,0,0,0.2);
                    }

                    button.btn:hover {
                        opacity: 0.85;
                        transform: scale(1.02);
                        transition: all 0.2s ease;
                    }
                `}
            </style>
        </>
    );
};

export default Perfil;
