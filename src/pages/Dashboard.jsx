import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const Dashboard = () => {
    return (
        <>
            <Menu />
            <div
                className="container text-center mt-5"
                style={{ marginLeft: "250px", padding: "20px" }}
            >
                <h1 className="mb-4">Bienvenido</h1>
                <div className="row">
                    {/* Tarjeta de Detección de Paquetes */}
                    <div className="col-md-3 mb-4">
                        <Link to="/deteccion_paquetes" className="text-decoration-none">
                            <div className="card shadow-lg h-100" style={{ transition: "transform 0.3s ease" }}>
                                <img
                                    src="/dis.png"
                                    className="card-img-top"
                                    alt="Detección de Paquetes"
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body bg-primary text-white">
                                    <h5 className="card-title">Detección de Paquetes</h5>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Tarjeta de Clasificación de Paquetes */}
                    <div className="col-md-3 mb-4">
                        <Link to="/clasificacion_paquetes" className="text-decoration-none">
                            <div className="card shadow-lg h-100" style={{ transition: "transform 0.3s ease" }}>
                                <img
                                    src="/eventos.jpg"
                                    className="card-img-top"
                                    alt="Clasificación de Paquetes"
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body bg-success text-white">
                                    <h5 className="card-title">Clasificación de Paquetes</h5>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Tarjeta de Datos Remotos */}
                    <div className="col-md-3 mb-4">
                        <Link to="/remotos" className="text-decoration-none">
                            <div className="card shadow-lg h-100" style={{ transition: "transform 0.3s ease" }}>
                                <img
                                    src="/lecturas.jpg"
                                    className="card-img-top"
                                    alt="Datos Remotos"
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body bg-danger text-white">
                                    <h5 className="card-title">Datos Remotos</h5>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Tarjeta de Productos */}
                    <div className="col-md-3 mb-4">
                        <Link to="/productos" className="text-decoration-none">
                            <div className="card shadow-lg h-100" style={{ transition: "transform 0.3s ease" }}>
                                <img
                                    src="/paquetes.webp"
                                    className="card-img-top"
                                    alt="Productos"
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body bg-warning text-dark">
                                    <h5 className="card-title">Productos</h5>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Tarjeta de Usuarios */}
                    <div className="col-md-3 mb-4">
                        <Link to="/usuarios" className="text-decoration-none">
                            <div className="card shadow-lg h-100" style={{ transition: "transform 0.3s ease" }}>
                                <img
                                    src="/users.jpg"
                                    className="card-img-top"
                                    alt="Usuarios"
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body bg-info text-white">
                                    <h5 className="card-title">Usuarios</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
