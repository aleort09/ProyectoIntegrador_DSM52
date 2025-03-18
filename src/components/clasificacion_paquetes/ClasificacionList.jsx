import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
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
      const response = await axios.get("http://localhost:5000/clasificacion_paquetes", {
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
      await axios.delete(`http://localhost:5000/clasificacion_paquetes/delete/${id}`);
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
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Lista de Clasificaciones de Paquetes</h2>

      {mensaje && <p className="text-green-600">{mensaje}</p>}

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <select value={filtroColor} onChange={(e) => setFiltroColor(e.target.value)} className="p-2 border rounded">
          <option value="">Todos los colores</option>
          <option value="Rojo">Rojo</option>
          <option value="Verde">Verde</option>
        </select>

        <select value={filtroAccion} onChange={(e) => setFiltroAccion(e.target.value)} className="p-2 border rounded">
          <option value="">Todas las acciones</option>
          <option value="Izquierda">Izquierda</option>
          <option value="Derecha">Derecha</option>
        </select>

        <button onClick={exportToExcel} className="bg-green-600 text-white p-2 rounded">Exportar a Excel</button>
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">ID Producto</th>
            <th className="border p-2">Etiqueta Color</th>
            <th className="border p-2">Acción</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clasificaciones.length > 0 ? (
            clasificaciones.map((clasificacion) => (
              <tr key={clasificacion.ID_Clasificacion} className="text-center">
                <td className="border p-2">{clasificacion.ID_Clasificacion}</td>
                <td className="border p-2">{clasificacion.ID_Producto}</td>
                <td className="border p-2">{clasificacion.Etiqueta_Color}</td>
                <td className="border p-2">{clasificacion.Accion}</td>
                <td className="border p-2">{clasificacion.Fecha_Hora}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(clasificacion.ID_Clasificacion)}
                    className="bg-red-600 text-white p-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No hay clasificaciones registradas.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 📊 Sección de Gráficas */}
      <div className="mt-6">
        <ClasificacionChart />
      </div>
    </div>
  );
};

export default ClasificacionList;
