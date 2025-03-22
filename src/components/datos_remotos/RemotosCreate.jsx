import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";

const RemotosCreate = ({ onRemotoAdded = () => {} }) => {
    const navigate = useNavigate();
    const [remoto, setRemoto] = useState({
        ID_Deteccion: "",
        ID_Clasificacion: "",
        Estado_Conexion: "Exitoso"
    });

    const handleChange = (e) => {
        setRemoto({ ...remoto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación básica antes de enviar la solicitud
        if (!remoto.ID_Deteccion || !remoto.ID_Clasificacion) {
            Swal.fire({
                title: "Error",
                text: "Por favor, complete todos los campos requeridos.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        // Asegúrate de que los valores sean números donde corresponda
        const payload = {
            ID_Deteccion: Number(remoto.ID_Deteccion),
            ID_Clasificacion: Number(remoto.ID_Clasificacion),
            Estado_Conexion: remoto.Estado_Conexion
        };

        axios.post("https://ravendev.jeotech.x10.mx/remotos/create", payload)
            .then(() => {
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Dato remoto creado correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });
                onRemotoAdded();
                navigate("/remotos");
                setRemoto({
                    ID_Deteccion: "",
                    ID_Clasificacion: "",
                    Estado_Conexion: "Exitoso"
                });
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
                let errorMessage = "Error desconocido al registrar el dato remoto.";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message; // Mensaje de error detallado del servidor
                }
                Swal.fire({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const containerStyle = {
        marginLeft: isMobile ? "0" : "205px",
        marginTop: isMobile ? "30px" : "0",
        padding: "5px",
        transition: "all 0.3s ease"
    };

    return (
        <>
            <Menu />
            <div className="container mt-2" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="text-center mb-4">Crear Dato Remoto</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">ID Detección</label>
                                    <input 
                                        type="number" 
                                        name="ID_Deteccion" 
                                        value={remoto.ID_Deteccion} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">ID Clasificación</label>
                                    <input 
                                        type="number" 
                                        name="ID_Clasificacion" 
                                        value={remoto.ID_Clasificacion} 
                                        onChange={handleChange} 
                                        className="form-control" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="form-label">Estado de Conexión</label>
                                    <select 
                                        name="Estado_Conexion" 
                                        value={remoto.Estado_Conexion} 
                                        onChange={handleChange} 
                                        className="form-control"
                                    >
                                        <option value="Exitoso">Exitoso</option>
                                        <option value="Fallido">Fallido</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Agregar Dato Remoto</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RemotosCreate;
