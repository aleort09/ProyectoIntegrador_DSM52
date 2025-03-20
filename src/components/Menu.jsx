import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Estado para detectar dispositivos móviles

    // Función para detectar cambios en el tamaño de la pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const menuItems = [
        { path: "/dashboard", icon: "bi-house-door", label: "Inicio" },
        { path: "/usuarios", icon: "bi-people", label: "Usuarios" },
        { path: "/deteccion_paquetes", icon: "bi-box-seam", label: "Detección de Paquetes" },
        { path: "/clasificacion_paquetes", icon: "bi-tags", label: "Clasificación de Paquetes" },
        { path: "/productos", icon: "bi-bag", label: "Productos" },
        { path: "/remotos", icon: "bi-device-hdd", label: "Datos Remotos" },
    ];

    return (
        <>
            {/* Integración de la fuente de Google Fonts */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap');
                    .custom-font {
                        font-family: ${isMobile ? "'Rubik Moonrocks', cursive" : "inherit"};
                        font-size: ${isMobile ? "1.5rem" : "1rem"};
                    }
                `}
            </style>

            {/* Botón para desplegar/ocultar el menú en móviles */}
            {isMobile && (
                <button
                    className="btn btn-primary fixed-top w-100"
                    style={{
                        zIndex: 1000,
                        left: 0,
                        top: 0,
                        borderRadius: 0,
                        padding: "10px",
                        backgroundColor: "#254064",
                        border: "none",
                    }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"}`}></i>
                </button>
            )}

            {/* Menú principal */}
            <div
                className="d-flex flex-column p-3 text-white"
                style={{
                    width: isMobile ? "100%" : "200px", // Ancho completo en móviles, 200px en ordenadores
                    height: isMobile ? "100vh" : "100vh", // Altura completa en móviles, altura completa en ordenadores
                    backgroundColor: "#254064",
                    position: "fixed",
                    left: isMobile ? (isMenuOpen ? 0 : "-100%") : 0, // Desplazamiento en móviles, siempre visible en ordenadores
                    top: isMobile ? "30px" : 0, // Margen superior en móviles, sin margen en ordenadores
                    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
                    transition: "left 0.3s ease",
                    zIndex: 999,
                    overflowY: "auto", // Permite desplazamiento vertical si el contenido es largo
                }}
            >
                {/* Logo con tamaño fijo */}
                <div className="d-flex align-items-center justify-content-center mb-3">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{ width: "150px", height: "auto", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                </div>

                <ul className="nav nav-pills flex-column mb-2">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item mb-2">
                            <Link
                                to={item.path}
                                className="nav-link d-flex align-items-center p-3 rounded text-white custom-font"
                                style={{ transition: "all 0.3s ease" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#ccc";
                                    e.currentTarget.style.color = "#254064";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#fff";
                                }}
                            >
                                <i className={`bi ${item.icon} me-2`}></i>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mt-2">
                    <hr style={{ borderColor: "#fff" }} />
                    <div className="dropdown">
                        <Link
                            to="#"
                            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle p-3 rounded custom-font"
                            id="dropdownUser"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ transition: "all 0.3s ease" }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#ccc";
                                e.currentTarget.style.color = "#254064";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#fff";
                            }}
                        >
                            <i className="bi bi-person-circle me-2" style={{ fontSize: "1.5rem" }}></i>
                            <strong>Perfil</strong>
                        </Link>
                        <ul
                            className="dropdown-menu dropdown-menu-dark text-small shadow"
                            aria-labelledby="dropdownUser"
                        >
                            <li>
                                <Link to="/perfil" className="dropdown-item custom-font">
                                    Ver Perfil
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button onClick={handleLogout} className="dropdown-item custom-font">
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;