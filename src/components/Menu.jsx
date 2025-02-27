import { Link } from "react-router-dom";
import './style.css';

const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <h2 className="navbar-brand me-auto">
                    <img src="/logo.png" alt="Logo" className="image" />
                </h2>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="navbar-nav">
                        <Link to="/dashboard" className="nav-link">Inicio</Link>
                        <Link to="/usuarios" className="nav-link">Usuarios</Link>
                        <Link to="/lecturas" className="nav-link">Lecturas</Link>
                        <Link to="/productos" className="nav-link">Productos</Link>
                        <Link to="/dispositivos" className="nav-link">Dispositivos</Link>
                        <Link to="/eventos" className="nav-link">Eventos</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Menu;