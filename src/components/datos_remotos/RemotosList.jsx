import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import RemotosChart from "../charts/RemotosChart";

const RemotosList = () => {
  const [remotos, setRemotos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetchRemotos();
  }, [filtroEstado, filtroFecha]);

  const fetchRemotos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/datos_remotos", {
        params: {
          estado_conexion: filtroEstado,
          fecha: filtroFecha,
        },
      });
      setRemotos(response.data);
    } catch (err) {
      console.error("Error al obtener los datos remotos", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este dato remoto?")) return;

    try {
      await axios.delete(`http://localhost:5000/datos_remotos/delete/${id}`);
      setRemotos(remotos.filter((r) => r.ID_Dato !== id));
      setMensaje("Dato remoto eliminado correctamente.");
    } catch (err) {
      console.error("Error al eliminar dato remoto", err);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(remotos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos Remotos");
    XLSX.writeFile(wb, "datos_remotos.xlsx");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Lista de Datos Remotos</h2>

      {mensaje && <p className="text-green-600">{mensaje}</p>}

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="p-2 border rounded">
          <option value="">Todos los estados de conexión</option>
          <option value="Exitoso">Exitoso</option>
          <option value="Fallido">Fallido</option>
        </select>

        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="p-2 border rounded"
        />

        <button onClick={exportToExcel} className="bg-green-600 text-white p-2 rounded">Exportar a Excel</button>
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">ID Detección</th>
            <th className="border p-2">ID Clasificación</th>
            <th className="border p-2">Estado Conexión</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {remotos.length > 0 ? (
            remotos.map((remoto) => (
              <tr key={remoto.ID_Dato} className="text-center">
                <td className="border p-2">{remoto.ID_Dato}</td>
                <td className="border p-2">{remoto.ID_Deteccion}</td>
                <td className="border p-2">{remoto.ID_Clasificacion}</td>
                <td className="border p-2">{remoto.Estado_Conexion}</td>
                <td className="border p-2">{remoto.Fecha_Hora}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(remoto.ID_Dato)}
                    className="bg-red-600 text-white p-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">No hay datos remotos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 📊 Sección de Gráficas */}
      <div className="mt-6">
        <RemotosChart />
      </div>
    </div>
  );
};

export default RemotosList;
