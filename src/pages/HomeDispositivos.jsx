import { useNavigate } from "react-router-dom";
import DispositivosList from "../components/dispositivos/DispositivosList";
import DispositivosCreate from "../components/dispositivos/DispositivosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeDispositivos = () => {
    const navigate = useNavigate();
    const [dispositivos, setDispositivos] = useState([]);
    const [filters, setFilters] = useState({
        tipo: "",
        estado: ""
    });

    useEffect(() => {
        fetchDispositivos();
    }, [filters]); // 🔄 Se ejecuta cada vez que cambian los filtros

    const fetchDispositivos = () => {
        axios.get("http://localhost:3000/api/dispositivos", { params: filters })
            .then(response => setDispositivos(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchDispositivos();
    };

    const handleDeleted = () => {
        fetchDispositivos();
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

            axios.post("http://localhost:3000/api/dispositivos/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchDispositivos();
                })
                .catch(error => console.error("Error al importar dispositivos:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dispositivos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dispositivos");
        XLSX.writeFile(workbook, "dispositivos.xlsx");
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
            <div className="container mt-4">
                <h1 className="text-center mb-4">Gestión de Dispositivos</h1>
                <div className="mb-4">
                    <DispositivosCreate onDispositivoAdded={handleAdded} />
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
                            name="tipo"
                            value={filters.tipo}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Todos</option>
                            <option value="Camara">Camara</option>
                            <option value="Motor">Motor</option>
                            <option value="Sensor">Sensor</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
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
                        </select>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                    {dispositivos.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay dispositivos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <DispositivosList
                                dispositivos={dispositivos}
                                setDispositivos={setDispositivos}
                                onDispositivoDeleted={handleDeleted}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeDispositivos;