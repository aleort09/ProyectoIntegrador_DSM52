import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as XLSX from "xlsx";
import PaquetesChart from "../charts/PaquetesChart";

const PaquetesList = ({ packageDetections, onPackageDetectionDeleted }) => {
    const [filteredPaquetes, setFilteredPaquetes] = useState(packageDetections || []);
    const [filter, setFilter] = useState("");
    const [estadoFilter, setEstadoFilter] = useState("");

    useEffect(() => {
        setFilteredPaquetes(packageDetections || []);
    }, [packageDetections]);

    useEffect(() => {
        let filtered = packageDetections || [];

        if (filter) {
            filtered = filtered.filter(
                (paquete) =>
                    paquete.Distancia.toString().includes(filter) ||
                    paquete.Estado.toLowerCase().includes(filter.toLowerCase())
            );
        }

        if (estadoFilter) {
            filtered = filtered.filter(
                (paquete) => paquete.Estado.toLowerCase() === estadoFilter.toLowerCase()
            );
        }

        setFilteredPaquetes(filtered);
    }, [filter, estadoFilter, packageDetections]);

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredPaquetes);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Paquetes");
        XLSX.writeFile(wb, "Paquetes.xlsx");
    };

    const handleDelete = (id) => {
        Axios.delete(`https://54.208.187.128/detecciones/delete/${id}`)
            .then(() => {
                onPackageDetectionDeleted();
            })
            .catch(error => {
                console.error("Error deleting package", error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Paquetes</h2>
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
            <PaquetesChart paquetes={filteredPaquetes} />
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
            <div className="d-flex justify-content-end mt-4">
                <button onClick={handleExport} className="btn btn-success">
                    Exportar a Excel
                </button>
            </div>
        </div>
    );
};

export default PaquetesList;