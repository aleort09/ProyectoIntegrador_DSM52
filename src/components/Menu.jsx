import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3"
            style={{
                width: "250px",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                backgroundColor: "#254064", // Color de fondo del menú
                boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Logo */}
            <div className="d-flex align-items-center justify-content-center mb-3">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxWidth: "100%", height: "auto", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
            </div>

            {/* Menú */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-2">
                    <Link
                        to="/dashboard"
                        className="nav-link d-flex align-items-center p-3 rounded"
                        style={{
                            color: "#fff", // Color de texto por defecto
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ccc";
                            e.currentTarget.style.color = "#254064"; // Cambia el color del texto al hacer hover
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#fff"; // Restaura el color del texto
                        }}
                    >
                        <i className="bi bi-house-door me-2"></i>
                        Inicio
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/usuarios"
                        className="nav-link d-flex align-items-center p-3 rounded"
                        style={{
                            color: "#fff", // Color de texto por defecto
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ccc";
                            e.currentTarget.style.color = "#254064"; // Cambia el color del texto al hacer hover
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#fff"; // Restaura el color del texto
                        }}
                    >
                        <i className="bi bi-people me-2"></i>
                        Usuarios
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/lecturas"
                        className="nav-link d-flex align-items-center p-3 rounded"
                        style={{
                            color: "#fff", // Color de texto por defecto
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ccc";
                            e.currentTarget.style.color = "#254064"; // Cambia el color del texto al hacer hover
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#fff"; // Restaura el color del texto
                        }}
                    >
                        <i className="bi bi-book me-2"></i>
                        Lecturas
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/productos"
                        className="nav-link d-flex align-items-center p-3 rounded"
                        style={{
                            color: "#fff", // Color de texto por defecto
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ccc";
                            e.currentTarget.style.color = "#254064"; // Cambia el color del texto al hacer hover
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#fff"; // Restaura el color del texto
                        }}
                    >
                        <i className="bi bi-box-seam me-2"></i>
                        Productos
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/dispositivos"
                        className="nav-link d-flex align-items-center p-3 rounded"
                        style={{
                            color: "#fff", // Color de texto por defecto
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ccc";
                            e.currentTarget.style.color = "#254064"; // Cambia el color del texto al hacer hover
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#fff"; // Restaura el color del texto
                        }}
                    >
                        <i className="bi bi-device-hdd me-2"></i>
                        Dispositivos
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/eventos"
                        className="nav-link d-flex align-items-center p-3 rounded"
                        style={{
                            color: "#fff", // Color de texto por defecto
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ccc";
                            e.currentTarget.style.color = "#254064"; // Cambia el color del texto al hacer hover
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#fff"; // Restaura el color del texto
                        }}
                    >
                        <i className="bi bi-calendar-event me-2"></i>
                        Eventos
                    </Link>
                </li>
            </ul>

            {/* Perfil y Cerrar Sesión */}
            <div className="mt-auto">
                <hr style={{ borderColor: "#fff" }} />
                <div className="dropdown">
                    <Link
                        to="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle p-3 rounded"
                        id="dropdownUser"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ transition: "all 0.3s ease" }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ccc";
                            e.currentTarget.style.color = "#254064"; // Cambia el color del texto al hacer hover
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#fff"; // Restaura el color del texto
                        }}
                    >
                        <img
                            src="perfil.gif"
                            alt="Perfil"
                            width="80"
                            height="80"
                            className="rounded-circle me-2"
                        />
                        <strong>Perfil</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser">
                        <li><Link to="/perfil" className="dropdown-item">Ver Perfil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button onClick={handleLogout} className="dropdown-item">Cerrar Sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;