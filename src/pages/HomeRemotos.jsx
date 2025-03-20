import { useNavigate } from "react-router-dom";
import RemotosList from "../components/datos_remotos/RemotosList";
import RemotosCreate from "../components/datos_remotos/RemotosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeRemotos = () => {
    const navigate = useNavigate();
    const [remoteData, setRemoteData] = useState([]);
    const [filters, setFilters] = useState({
        estadoConexion: "",
        idDeteccion: "",
        idClasificacion: "",
    });

    useEffect(() => {
        fetchRemoteData();
    }, [filters]);

    // Cambiar la URL para que apunte a datos remotos
    const fetchRemoteData = () => {
        axios.get("https://54.208.187.128/remotos", { params: filters })
            .then(response => setRemoteData(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchRemoteData();
    };

    const handleDeleted = () => {
        fetchRemoteData();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            console.log("Datos del Excel:", jsonData);

            // Asegurarse de que el endpoint para importar datos remotos esté correcto
            axios.post("https://54.208.187.128/importar/datos_remotos", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchRemoteData();
                })
                .catch(error => console.error("Error al importar datos remotos:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(remoteData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Remotos");
        XLSX.writeFile(workbook, "datos_remotos.xlsx");
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <>
            <Menu />
            <div className="p-4" style={{ marginLeft: "250px" }}>
                <div className="mb-4">
                    <RemotosCreate onRemoteDataAdded={handleAdded} />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="form-control mb-2"
                    />
                    <button
                        onClick={exportToExcel}
                        className="btn btn-success w-100 mb-3"
                    >
                        Exportar a Excel
                    </button>
                </div>
                <div className="row mb-4">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por Estado de Conexión</label>
                        <select
                            name="estadoConexion"
                            value={filters.estadoConexion}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Todos</option>
                            <option value="Conectado">Conectado</option>
                            <option value="Desconectado">Desconectado</option>
                            <option value="Error">Error</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por ID de Detección</label>
                        <input
                            type="number"
                            name="idDeteccion"
                            value={filters.idDeteccion}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Ingrese el ID de detección"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por ID de Clasificación</label>
                        <input
                            type="number"
                            name="idClasificacion"
                            value={filters.idClasificacion}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Ingrese el ID de clasificación"
                        />
                    </div>
                </div>
                <div>
                    <div className="card-body">
                        {remoteData.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <RemotosList
                                remoteData={remoteData}
                                setRemoteData={setRemoteData}
                                onRemoteDataDeleted={handleDeleted}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeRemotos;

