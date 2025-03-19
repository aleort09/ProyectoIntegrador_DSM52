import { useState } from "react";
import axios from "axios";

const UsuariosCreate = ({ onUsuarioAdded }) => {
    const [usuario, setUsuario] = useState({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Telefono: "",
        Direccion: "",
        Rol: "Cliente",
    });

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://54.208.187.128/users/create", usuario)
            .then(() => {
                alert("Usuario registrado");
                onUsuarioAdded();
                setUsuario({
                    Nombre: "",
                    Apellido: "",
                    Correo: "",
                    Telefono: "",
                    Direccion: "",
                    Rol: "Cliente",
                });
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Crear Usuario</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="Nombre" value={usuario.Nombre} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input type="text" name="Apellido" value={usuario.Apellido} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" name="Correo" value={usuario.Correo} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" name="Telefono" value={usuario.Telefono} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" name="Direccion" value={usuario.Direccion} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rol</label>
                    <select name="Rol" value={usuario.Rol} onChange={handleChange} className="form-select" required>
                        <option value="Cliente">Cliente</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Agregar Usuario</button>
            </form>
        </div>
    );
};

export default UsuariosCreate;