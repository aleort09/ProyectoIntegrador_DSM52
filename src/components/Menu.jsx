import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

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
        <div className="d-flex flex-column p-3" style={{ width: "200px", height: "100vh", position: "fixed", left: 0, top: 0, backgroundColor: "#254064", boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)" }}>
            <div className="d-flex align-items-center justify-content-center mb-3">
                <img src="/logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: "100%", height: "auto", transition: "transform 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
            </div>

            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map((item, index) => (
                    <li key={index} className="nav-item mb-2">
                        <Link to={item.path} className="nav-link d-flex align-items-center p-3 rounded text-white" style={{ transition: "all 0.3s ease" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ccc"; e.currentTarget.style.color = "#254064"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#fff"; }}>
                            <i className={`bi ${item.icon} me-2`}></i>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-auto">
                <hr style={{ borderColor: "#fff" }} />
                <div className="dropdown">
                    <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle p-3 rounded" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false"
                        style={{ transition: "all 0.3s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ccc"; e.currentTarget.style.color = "#254064"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#fff"; }}>
                        <img src="perfil.gif" alt="Perfil" width="80" height="80" className="rounded-circle me-2" />
                        <strong>Perfil</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser">
                        <li><Link to="/perfil" className="dropdown-item">Ver Perfil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button onClick={handleLogout} className="dropdown-item">Cerrar Sesión</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Menu;
