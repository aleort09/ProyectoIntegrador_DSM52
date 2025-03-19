import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as XLSX from "xlsx";

const PaquetesList = ({ packageDetections, onPackageDetectionDeleted }) => {
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
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Distancia (cm)</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {packageDetections.map((paquete) => (
                        <tr key={paquete.ID_Paquete}>
                            <td>{paquete.ID_Paquete}</td>
                            <td>{paquete.Distancia}</td>
                            <td>{new Date(paquete.Fecha).toLocaleString()}</td>
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
        </div>
    );
};

export default PaquetesList;