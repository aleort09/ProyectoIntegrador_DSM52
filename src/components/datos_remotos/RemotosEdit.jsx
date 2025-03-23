import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Menu from "../Menu.jsx";

const RemotosEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [remoto, setRemoto] = useState({
        ID_Deteccion: "",
        ID_Clasificacion: "",
        Estado_Conexion: "Exitoso",
    });

    const [detecciones, setDetecciones] = useState([]); // Estado para almacenar las detecciones
    const [clasificaciones, setClasificaciones] = useState([]); // Estado para almacenar las clasificaciones
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    // Obtener las detecciones y clasificaciones desde la API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [deteccionesResponse, clasificacionesResponse] = await Promise.all([
                    axios.get("https://ravendev.jeotech.x10.mx/detecciones"),
                    axios.get("https://ravendev.jeotech.x10.mx/clasificaciones"),
                ]);

                setDetecciones(deteccionesResponse.data); // Almacenar las detecciones
                setClasificaciones(clasificacionesResponse.data); // Almacenar las clasificaciones
                setLoading(false); // Indicar que la carga ha terminado
            } catch (error) {
                console.error("Error al obtener los datos:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron cargar las detecciones o clasificaciones.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
                setLoading(false); // Indicar que la carga ha terminado (incluso si hay un error)
            }
        };

        fetchData();
    }, []);

    // Obtener el remoto actual
    useEffect(() => {
        axios
            .get(`https://ravendev.jeotech.x10.mx/remotos/${id}`)
            .then((response) => setRemoto(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setRemoto({ ...remoto, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas actualizar la información del remoto?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`https://ravendev.jeotech.x10.mx/remotos/edit/${id}`, remoto)
                    .then(() => {
                        Swal.fire({
                            title: "¡Actualizado!",
                            text: "El remoto ha sido actualizado correctamente.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            navigate("/remotos"); // Redirigir a la lista de remotos
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo actualizar el remoto. Inténtelo de nuevo más tarde.",
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                    });
            }
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
        transition: "all 0.3s ease",
    };

    return (
        <>
            <Menu />
            <div className="container mt-5" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <h2 className="text-center mb-4">Editar Remoto</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Detección</label>
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Cargando...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <select
                                            name="ID_Deteccion"
                                            value={remoto.ID_Deteccion}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">Seleccione una detección</option>
                                            {detecciones.map((deteccion) => (
                                                <option key={deteccion.ID_Deteccion} value={deteccion.ID_Deteccion}>
                                                    {deteccion.Nombre} (ID: {deteccion.ID_Deteccion})
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Clasificación</label>
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Cargando...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <select
                                            name="ID_Clasificacion"
                                            value={remoto.ID_Clasificacion}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        >
                                            <option value="">Seleccione una clasificación</option>
                                            {clasificaciones.map((clasificacion) => (
                                                <option key={clasificacion.ID_Clasificacion} value={clasificacion.ID_Clasificacion}>
                                                    {clasificacion.Nombre} (ID: {clasificacion.ID_Clasificacion})
                                                </option>
                                            ))}
                                        </select>
                                    )}
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
                            <button type="submit" className="btn btn-primary mt-3">
                                Actualizar Remoto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RemotosEdit;