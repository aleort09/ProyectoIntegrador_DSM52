import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Informacion = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    // Función para cargar los datos del usuario
    const fetchUserData = async () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            try {
                const response = await axios.get(`https://ravendev.jeotech.x10.mx/users/${userId}`);
                setUser(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        }
    };

    // Cargar los datos del usuario al montar el componente
    useEffect(() => {
        fetchUserData();
    }, []);

    const handleEdit = () => {
        setEditMode(true);
    };

    const [refresh, setRefresh] = useState(false); // Estado adicional para forzar re-renderizado

const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    try {
        const response = await axios.put(`https://ravendev.jeotech.x10.mx/users/edit/${userId}`, formData);
        console.log("Respuesta de la API:", response.data); // Verifica la respuesta

        // Actualizar el estado `user` con los nuevos datos
        setUser((prevUser) => ({
            ...prevUser,
            ...response.data, // Sobrescribe solo los campos actualizados
        }));

        setEditMode(false); // Salir del modo edición
        setRefresh((prev) => !prev); // Forzar re-renderizado
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
    }
};

    const handleDelete = async () => {
        const userId = localStorage.getItem("userId");
        try {
            await axios.delete(`https://ravendev.jeotech.x10.mx/users/delete/${userId}`);
            localStorage.clear();
            navigate("/login");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleGoBack = () => {
        navigate(-1); // Regresar a la página anterior
    };

    if (!user) return <p className="loading-text">Cargando datos del usuario...</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Perfil del Usuario</h2>
            <div className="card shadow">
                <div className="card-body">
                    {editMode ? (
                        <>
                            <div className="mb-3">
                                <label className="form-label"><strong>Nombre:</strong></label>
                                <input
                                    type="text"
                                    name="Nombre"
                                    value={formData.Nombre || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Apellido:</strong></label>
                                <input
                                    type="text"
                                    name="Apellido"
                                    value={formData.Apellido || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Correo:</strong></label>
                                <input
                                    type="email"
                                    name="Correo"
                                    value={formData.Correo || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Teléfono:</strong></label>
                                <input
                                    type="text"
                                    name="Telefono"
                                    value={formData.Telefono || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Dirección:</strong></label>
                                <input
                                    type="text"
                                    name="Direccion"
                                    value={formData.Direccion || ""}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-success" onClick={handleSave}>
                                    <i className="bi bi-save me-2"></i>Guardar
                                </button>
                                <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                                    <i className="bi bi-x-circle me-2"></i>Cancelar
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p><strong>Nombre:</strong> {user.Nombre} {user.Apellido}</p>
                            <p><strong>Correo:</strong> {user.Correo}</p>
                            <p><strong>Teléfono:</strong> {user.Telefono}</p>
                            <p><strong>Dirección:</strong> {user.Direccion}</p>
                            <p><strong>Rol:</strong> {user.Rol}</p>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary" onClick={handleEdit}>
                                    <i className="bi bi-pencil me-2"></i>Editar
                                </button>
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    <i className="bi bi-trash me-2"></i>Eliminar Cuenta
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <button className="btn btn-secondary mt-3" onClick={handleGoBack}>
                <i className="bi bi-arrow-left me-2"></i>Regresar
            </button>
        </div>
    );
};

export default Informacion;