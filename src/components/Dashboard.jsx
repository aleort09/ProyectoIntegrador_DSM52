import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="container dashboard-container">
            <h1>Dashboard de Administrador</h1>
            <p>Bienvenido, aquí puedes gestionar usuarios, pedidos y más.</p>
            <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Dashboard;
