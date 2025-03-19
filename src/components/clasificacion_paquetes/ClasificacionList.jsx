import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom"; // Para el botón de editar
import ClasificacionChart from "../charts/ClasificacionChart";

const ClasificacionList = () => {
    const [clasificaciones, setClasificaciones] = useState([]);
    const [filtroColor, setFiltroColor] = useState("");
    const [filtroAccion, setFiltroAccion] = useState("");
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        fetchClasificaciones();
    }, [filtroColor, filtroAccion]);

    const fetchClasificaciones = async () => {
        try {
            const response = await axios.get("https://54.208.187.128/clasificaciones", {
                params: {
                    etiqueta_color: filtroColor,
                    accion: filtroAccion,
                },
            });
            setClasificaciones(response.data);
        } catch (err) {
            console.error("Error al obtener clasificaciones", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta clasificación?")) return;

        try {
            await axios.delete(`https://54.208.187.128/clasificaciones/delete/${id}`);
            setClasificaciones(clasificaciones.filter((c) => c.ID_Clasificacion !== id));
            setMensaje("Clasificación eliminada correctamente.");
        } catch (err) {
            console.error("Error al eliminar clasificación", err);
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(clasificaciones);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Clasificaciones");
        XLSX.writeFile(wb, "clasificaciones.xlsx");
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Clasificaciones de Paquetes</h2>

            {mensaje && <div className="alert alert-success">{mensaje}</div>}

            {/* Filtros */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Filtrar por Color:</label>
                    <select
                        value={filtroColor}
                        onChange={(e) => setFiltroColor(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Todos los colores</option>
                        <option value="Rojo">Rojo</option>
                        <option value="Verde">Verde</option>
                    </select>
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Filtrar por Acción:</label>
                    <select
                        value={filtroAccion}
                        onChange={(e) => setFiltroAccion(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Todas las acciones</option>
                        <option value="Izquierda">Izquierda</option>
                        <option value="Derecha">Derecha</option>
                    </select>
                </div>
                <div className="col-md-4 mb-3 d-flex align-items-end">
                    <button onClick={exportToExcel} className="btn btn-success w-100">
                        Exportar a Excel
                    </button>
                </div>
            </div>

            {/* Tabla */}
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>ID Producto</th>
                        <th>Etiqueta Color</th>
                        <th>Acción</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clasificaciones.length > 0 ? (
                        clasificaciones.map((clasificacion) => (
                            <tr key={clasificacion.ID_Clasificacion}>
                                <td>{clasificacion.ID_Clasificacion}</td>
                                <td>{clasificacion.ID_Producto}</td>
                                <td>{clasificacion.Etiqueta_Color}</td>
                                <td>{clasificacion.Accion}</td>
                                <td>{new Date(clasificacion.Fecha_Hora).toLocaleString()}</td>
                                <td>
                                    <Link
                                        to={`/clasificaciones/edit/${clasificacion.ID_Clasificacion}`}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(clasificacion.ID_Clasificacion)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No hay clasificaciones registradas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Gráfica */}
            <div className="mt-5">
                <h4 className="text-center mb-4">Gráfica de Clasificaciones</h4>
                <ClasificacionChart clasificaciones={clasificaciones} />
            </div>
        </div>
    );
};

export default ClasificacionList;