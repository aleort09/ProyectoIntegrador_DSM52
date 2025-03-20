import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&family=Nunito:wght@400;700&display=swap');

                    .custom-font {
                        font-family: 'Nunito', sans-serif;
                        font-weight: 600;
                    }

                    .menu-link i,
.dropdown-toggle i {
    margin-right: 0.5rem !important; /* Equivale a me-2 */
}

.menu-link {
    padding: 8px 10px; /* Un poco más compacto */
    font-size: 0.95rem;
}

.dropdown-toggle {
    white-space: nowrap;
    font-size: 0.95rem;
}


                    .menu-link:hover {
                        background-color: #f0f4fa;
                        color: #254064 !important;
                        transform: translateX(3px);
                    }

                    .menu-button {
                        font-family: 'Rubik Moonrocks', cursive;
                        letter-spacing: 1px;
                        background-color: #254064;
                        border: none;
                        border-radius: 0;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                        color: white;
                        transition: background-color 0.3s ease;
                    }

                    .menu-button:hover {
                        background-color: #1b2f4b;
                    }

                    .sidebar-logo img {
                        transition: transform 0.3s ease;
                    }

                    .sidebar-logo img:hover {
                        transform: scale(1.1);
                    }

                    .menu-container {
                        background: linear-gradient(to bottom, #254064, #1e3552);
                        box-shadow: 3px 0 20px rgba(0, 0, 0, 0.15);
                    }

                    .dropdown-menu {
                        background-color: #1e3552;
                    }

                    .dropdown-item:hover {
                        background-color: #2d4e76;
                    }
                `}
            </style>

            {/* Botón móvil */}
            {isMobile && (
                <button
                    className="btn menu-button fixed-top w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{ zIndex: 1000, top: 0, padding: "12px 0" }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className={`bi ${isMenuOpen ? "bi-x" : "bi-list"}`} style={{ fontSize: "1.4rem" }}></i>
                    <span>{isMenuOpen ? "Ocultar Menú" : "Ver Menú"}</span>
                </button>
            )}

            {/* Menú principal */}
            <div
                className="d-flex flex-column p-3 text-white menu-container"
                style={{
                    width: isMobile ? "100%" : "200px",
                    height: "100vh",
                    position: "fixed",
                    left: isMobile ? (isMenuOpen ? 0 : "-100%") : 0,
                    top: isMobile ? "48px" : 0,
                    transition: "left 0.4s ease",
                    zIndex: 999,
                }}
            >
                {/* Logo */}
                <div className="sidebar-logo d-flex justify-content-center mb-4">
                    <img src="/logo.png" alt="Logo" style={{ width: "120px", height: "auto" }} />
                </div>

                {/* Items del menú */}
                <ul className="nav nav-pills flex-column mb-4">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item mb-2">
                            <Link
                                to={item.path}
                                className="nav-link text-white d-flex align-items-center menu-link custom-font"
                            >
                                <i className={`bi ${item.icon}`} style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}></i>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <hr className="text-white opacity-50" />

                {/* Perfil */}
                <div className="dropdown mt-auto">
                    <Link
                        to="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle custom-font"
                        id="dropdownUser"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i className="bi bi-person-circle" style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}></i>
                        <strong>Perfil</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow mt-2" aria-labelledby="dropdownUser">
                        <li>
                            <Link to="/perfil" className="dropdown-item custom-font">
                                Ver Perfil
                            </Link>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button onClick={handleLogout} className="dropdown-item custom-font">
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Menu;
