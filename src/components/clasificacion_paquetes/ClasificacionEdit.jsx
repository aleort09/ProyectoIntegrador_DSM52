import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Menu from "../Menu.jsx";

const ClasificacionEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [clasificacion, setClasificacion] = useState({
        ID_Producto: "",
        Etiqueta_Color: "Rojo",
        Accion: "Izquierda",
    });

    const [productos, setProductos] = useState([]); // Estado para almacenar los productos
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    // Obtener los productos desde la API
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get("https://ravendev.jeotech.x10.mx/productos");
                setProductos(response.data); // Almacenar los productos en el estado
                setLoading(false); // Indicar que la carga ha terminado
            } catch (error) {
                console.error("Error al obtener los productos:", error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron cargar los productos.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
                setLoading(false); // Indicar que la carga ha terminado (incluso si hay un error)
            }
        };

        fetchProductos();
    }, []);

    // Obtener la clasificación actual
    useEffect(() => {
        axios
            .get(`https://ravendev.jeotech.x10.mx/clasificaciones/${id}`)
            .then((response) => setClasificacion(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setClasificacion({ ...clasificacion, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas actualizar la clasificación del paquete?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`https://ravendev.jeotech.x10.mx/clasificaciones/edit/${id}`, clasificacion)
                    .then(() => {
                        Swal.fire({
                            title: "¡Actualizado!",
                            text: "La clasificación ha sido actualizada correctamente.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            navigate("/clasificacion_paquetes");
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo actualizar la clasificación. Inténtelo de nuevo más tarde.",
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
                    <div className="col-md-8 col-lg-6">
                        <h2 className="text-center mb-4">Editar Clasificación de Paquete</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="mb-3">
                                <label className="form-label">Producto</label>
                                {loading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Cargando...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <select
                                        name="ID_Producto"
                                        value={clasificacion.ID_Producto}
                                        onChange={handleChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {productos.map((producto) => (
                                            <option key={producto.ID_Producto} value={producto.ID_Producto}>
                                                {producto.Nombre}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Etiqueta de Color</label>
                                <select
                                    name="Etiqueta_Color"
                                    value={clasificacion.Etiqueta_Color}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Rojo">Rojo</option>
                                    <option value="Verde">Verde</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Acción</label>
                                <select
                                    name="Accion"
                                    value={clasificacion.Accion}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Izquierda">Izquierda</option>
                                    <option value="Derecha">Derecha</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Actualizar Clasificación
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClasificacionEdit;