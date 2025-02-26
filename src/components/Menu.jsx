import { Link } from "react-router-dom";
import './style.css';

const Menu = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">
                <img src="/logo.png" className="image"></img>
            </h2>
            <div className="enlaces">
                <Link to="/dashboard">Inicio</Link>
                <Link to="/usuarios">Usuarios</Link>
                <Link to="/lecturas">Lecturas</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/dispositivos">Dispositivos</Link>
                <Link to="/eventos">Eventos</Link>
            </div>
        </nav>
    );
};

export default Menu;
