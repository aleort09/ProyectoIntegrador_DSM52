import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDetails = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/usuarios/1")
            .then(response => setUser(response.data))
            .catch(error => console.error("Error al obtener usuario:", error));
    }, []);

    if (!user) return <p>Cargando datos del usuario...</p>;

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-lg">
                <h2 className="text-center">Perfil del Usuario</h2>
                <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
                <p><strong>Correo:</strong> {user.correo}</p>
                <p><strong>Teléfono:</strong> {user.telefono || "No registrado"}</p>
                <p><strong>Dirección:</strong> {user.direccion || "No registrada"}</p>
                <p><strong>Rol:</strong> {user.rol}</p>
            </div>
        </div>
    );
};

export default UserDetails;