import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './style.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // Función para cambiar el tema
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.body.classList.toggle("dark-theme", !isDarkTheme);
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "#254064" }}
        >
            <div className="container-fluid">
                {/* Logo de la empresa */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/logo.png" // Ruta del logo de la empresa
                        alt="Logo de la empresa"
                        width="40"
                        height="40"
                        className="me-2"
                    />
                    <span className="fw-bold">Nombre de la Empresa</span>
                </Link>

                {/* Dropdown en la parte derecha */}
                <div className="ms-auto">
                    <div className="dropdown">
                        <button
                            className="btn btn-light dropdown-toggle d-flex align-items-center"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="bi bi-person-circle me-2"></i> {/* Ícono de usuario */}
                            Menú
                        </button>
                        <ul
                            className="dropdown-menu dropdown-menu-end shadow"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <li>
                                <Link className="dropdown-item" to="/informacion">
                                    <i className="bi bi-person me-2"></i> {/* Ícono de perfil */}
                                    Ver Perfil
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={toggleTheme}>
                                    <i className={`bi ${isDarkTheme ? "bi-sun" : "bi-moon"} me-2`}></i> {/* Ícono de tema */}
                                    {isDarkTheme ? "Tema Claro" : "Tema Oscuro"}
                                </button>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button className="dropdown-item text-danger" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2"></i> {/* Ícono de cerrar sesión */}
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;