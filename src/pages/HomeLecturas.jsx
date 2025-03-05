import { useNavigate } from "react-router-dom";
import LecturasList from "../components/lecturas/LecturasList";
import LecturasCreate from "../components/lecturas/LecturasCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";
import LecturasChart from "../components/charts/LecturasChart";

const HomeLecturas = () => {
    const navigate = useNavigate();
    const [lecturas, setLecturas] = useState([]);
    const [filters, setFilters] = useState({
        tipo_sensor: ""
    });

    useEffect(() => {
        fetchLecturas();
    }, [filters]); // 🔄 Se ejecuta cada vez que cambian los filtros

    const fetchLecturas = () => {
        axios.get("http://localhost:3000/api/lecturas_sensores", { params: filters })
            .then(response => setLecturas(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchLecturas();
    };

    const handleDeleted = () => {
        fetchLecturas();
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

            axios.post("http://localhost:3000/api/lecturas_sensores/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchLecturas();
                })
                .catch(error => console.error("Error al importar lecturas:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(lecturas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Lecturas");
        XLSX.writeFile(workbook, "lecturas.xlsx");
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
            <div
            className="p-4"
            style={{ marginLeft: "250px" }}
            >
                <div className="mb-4">
                    <LecturasCreate onLecturaAdded={handleAdded} />
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
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Filtrar por Tipo de Sensor</label>
                        <select
                            name="tipo_sensor"
                            value={filters.tipo_sensor}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Todos</option>
                            <option value="Temperatura">Temperatura</option>
                            <option value="Proximidad">Proximidad</option>
                            <option value="Peso">Peso</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="card-body">
                        {lecturas.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <LecturasList
                            lecturas={lecturas}
                            setLecturas={setLecturas}
                            onLecturaDeleted={handleDeleted}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <div className="card-body">
                        <LecturasChart lecturas={lecturas} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeLecturas;