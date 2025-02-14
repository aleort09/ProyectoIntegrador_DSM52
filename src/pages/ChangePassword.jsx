import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/usuarios/cambiar-contraseña", {
                correo,
                password
            });
            setMensaje(response.data.message);
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            setMensaje("Hubo un error al cambiar tu contraseña.");
        }
    };

    return (
        <div className="card p-4 shadow-lg">
            <h2 className="text-center">Cambiar Contraseña</h2>
            {mensaje && <p className="alert alert-info">{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Correo" 
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)} 
                    required 
                    className="form-control" 
                />
                <input 
                    type="password" 
                    placeholder="Nueva Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="form-control" 
                />
                <button type="submit" className="btn btn-primary w-100">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default ChangePassword;