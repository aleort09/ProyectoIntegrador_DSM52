import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as XLSX from "xlsx";
import PaquetesChart from "../charts/PaquetesChart";


const PaquetesList = () => {
  const [paquetes, setPaquetes] = useState([]);
  const [filteredPaquetes, setFilteredPaquetes] = useState([]);
  const [filter, setFilter] = useState(""); // Filtro de texto
  const [estadoFilter, setEstadoFilter] = useState(""); // Filtro por estado

  // Obtener la lista de paquetes
  useEffect(() => {
    Axios.get("https://54.208.187.128/detecciones")
      .then((response) => {
        setPaquetes(response.data);
        setFilteredPaquetes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // Filtrar paquetes
  useEffect(() => {
    let filtered = paquetes;

    // Filtrar por texto
    if (filter) {
      filtered = filtered.filter(
        (paquete) =>
          paquete.Distancia.toString().includes(filter) ||
          paquete.Estado.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Filtrar por estado
    if (estadoFilter) {
      filtered = filtered.filter(
        (paquete) => paquete.Estado.toLowerCase() === estadoFilter.toLowerCase()
      );
    }

    setFilteredPaquetes(filtered);
  }, [filter, estadoFilter, paquetes]);

  // Función para exportar a Excel
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPaquetes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Paquetes");
    XLSX.writeFile(wb, "Paquetes.xlsx");
  };

  // Función para eliminar un paquete
  const handleDelete = (id) => {
    Axios.delete(`/api/deteccion_paquetes/delete/${id}`)
      .then(() => {
        setPaquetes(paquetes.filter((paquete) => paquete.ID_Paquete !== id));
        setFilteredPaquetes(filteredPaquetes.filter((paquete) => paquete.ID_Paquete !== id));
      })
      .catch((error) => {
        console.error("Error deleting package", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Paquetes</h2>

      {/* Filtros */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Filtrar por distancia o estado..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="form-select mt-2"
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
        >
          <option value="">Filtrar por estado</option>
          <option value="Detectado">Detectado</option>
          <option value="No detectado">No detectado</option>
        </select>
      </div>

      {/* Mostrar las gráficas */}
      <PaquetesChart paquetes={filteredPaquetes} />

      {/* Tabla de paquetes */}
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Distancia</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPaquetes.map((paquete) => (
            <tr key={paquete.ID_Paquete}>
              <td>{paquete.ID_Paquete}</td>
              <td>{paquete.Distancia}</td>
              <td>{paquete.Estado}</td>
              <td>
                <button
                  onClick={() => handleDelete(paquete.ID_Paquete)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para exportar */}
      <div className="d-flex justify-content-end mt-4">
        <button onClick={handleExport} className="btn btn-success">
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default PaquetesList;
