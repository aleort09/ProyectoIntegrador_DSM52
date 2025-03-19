import { useNavigate } from "react-router-dom";
import PaquetesList from "../components/deteccion_paquetes/PaquetesList";  
import PaquetesCreate from "../components/deteccion_paquetes/PaquetesCreate";  // Corregido nombre de componente
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomePaquetes = () => {
    const navigate = useNavigate();
    const [packageDetections, setPackageDetections] = useState([]);
    const [filters, setFilters] = useState({
        estado: "",
        distanciaMin: "",
        distanciaMax: "",
    });

    useEffect(() => {
        fetchPackageDetections();
    }, [filters]);

    
    const fetchPackageDetections = () => {
        axios.get("https://54.208.187.128/detecciones", { params: filters })
            .then(response => setPackageDetections(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchPackageDetections();
    };

    const handleDeleted = () => {
        fetchPackageDetections();
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

            
            axios.post("https://54.208.187.128/import/deteccion_paquetes", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchPackageDetections();
                })
                .catch(error => console.error("Error al importar datos de detección:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(packageDetections);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Detección de Paquetes");
        XLSX.writeFile(workbook, "deteccion_paquetes.xlsx");
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
                    <PaquetesCreate onPackageDetectionAdded={handleAdded} /> 
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
                        <label className="form-label">Filtrar por Estado</label>
                        <select
                            name="estado"
                            value={filters.estado}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Todos</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Error">Error</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por Distancia (Mínima)</label>
                        <input
                            type="number"
                            name="distanciaMin"
                            value={filters.distanciaMin}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Ingrese la distancia mínima"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por Distancia (Máxima)</label>
                        <input
                            type="number"
                            name="distanciaMax"
                            value={filters.distanciaMax}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Ingrese la distancia máxima"
                        />
                    </div>
                </div>
                <div>
                    <div className="card-body">
                        {packageDetections.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <PaquetesList
                                packageDetections={packageDetections}
                                setPackageDetections={setPackageDetections}
                                onPackageDetectionDeleted={handleDeleted}
                            /> 
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePaquetes;
