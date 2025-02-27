import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const Dashboard = () => {
    return (
        <>
            <div className="container text-center mt-5">
                <h1 className="mb-4">Bienvenido</h1>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <Link to="/dispositivos" className="text-decoration-none">
                            <div className="card">
                                <img src="/dis.png" className="card-img-top" alt="Dispositivos" />
                                <div className="card-body bg-primary text-white">Dispositivos</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 mb-4">
                        <Link to="/eventos" className="text-decoration-none">
                            <div className="card">
                                <img src="/eventos.jpg" className="card-img-top" alt="Eventos" />
                                <div className="card-body bg-success text-white">Eventos</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 mb-4">
                        <Link to="/lecturas" className="text-decoration-none">
                            <div className="card">
                                <img src="/lecturas.jpg" className="card-img-top" alt="Lecturas" />
                                <div className="card-body bg-danger text-white">Lecturas</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 mb-4">
                        <Link to="/productos" className="text-decoration-none">
                            <div className="card">
                                <img src="/paquetes.webp" className="card-img-top" alt="Productos" />
                                <div className="card-body bg-warning text-dark">Productos</div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-3 mb-4">
                        <Link to="/usuarios" className="text-decoration-none">
                            <div className="card">
                                <img src="/users.jpg" className="card-img-top" alt="Usuarios" />
                                <div className="card-body bg-info text-white">Usuarios</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
