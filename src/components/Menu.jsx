import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">JAred</h2>
            <div className="enlaces">
                <Link to="/">Inicio</Link>
                <Link to="/alumnos">Alumnos</Link>
                <Link to="/grupos">Grupos</Link>
                <Link to="/carreras">Carreras</Link>
                <Link to="/universidades">Universidades</Link>
            </div>
        </nav>
    );
};

export default Menu;
