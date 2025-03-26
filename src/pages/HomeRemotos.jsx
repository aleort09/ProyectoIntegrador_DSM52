import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import Menu from "../components/Menu";
import RemotosList from "../components/datos_remotos/RemotosList";
import RemotosChart from "../components/charts/RemotosChart";

const HomeRemotos = () => {
    const navigate = useNavigate();
    const [remoteData, setRemoteData] = useState([]);
    const [filters, setFilters] = useState({ estado_conexion: "" });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        fetchRemoteData();
    }, [filters]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchRemoteData = () => {
        axios.get("https://ravendev.jeotech.x10.mx/remotos", { params: filters })
            .then(response => setRemoteData(response.data))
            .catch(error => console.error(error));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            axios.post("https://ravendev.jeotech.x10.mx/importar/datos_remotos", jsonData)
                .then(response => {
                    Swal.fire("¡Éxito!", response.data.message, "success");
                    fetchRemoteData();
                })
                .catch(() => {
                    Swal.fire("Error", "Hubo un problema al importar los datos remotos.", "error");
                });
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(remoteData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Remotos");
        XLSX.writeFile(workbook, "datos_remotos.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Datos Remotos", 10, 10);
        autoTable(doc, {
            head: [["ID", "Estado de Conexión", "ID Detección", "ID Clasificación", "Fecha"]],
            body: remoteData.map(({ ID_Remoto, Estado_Conexion, ID_Deteccion, ID_Clasificacion, Fecha_Hora }) => [
                ID_Remoto,
                Estado_Conexion,
                ID_Deteccion,
                ID_Clasificacion,
                new Date(Fecha_Hora).toLocaleDateString(),
            ]),
        });
        doc.save("datos_remotos.pdf");
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Menu />
            <div className="main-content" style={{ marginLeft: isMobile ? "0" : "200px", padding: "5px", transition: "all 0.3s ease" }}>
                <div className="p-4">
                    <h2 className="text-center">Gestión de Datos Remotos</h2>
                    <div className="mb-3">
                        <label className="form-label">Importar Datos Remotos desde Excel</label>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="form-control mb-2" />
                        <div className="d-flex gap-2">
                            <button onClick={exportToExcel} className="btn btn-success flex-grow-1">Exportar a Excel</button>
                            <button onClick={exportToPDF} className="btn btn-danger flex-grow-1">Exportar a PDF</button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <select name="estado_conexion" value={filters.estado_conexion} onChange={handleFilterChange} className="form-select">
                                <option value="">Todos</option>
                                <option value="Exitoso">Exitoso</option>
                                <option value="Fallido">Fallido</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mb-4">
                            <button onClick={() => navigate("/remotos/create")} className="btn btn-primary">
                                <FaPlus /> Crear Dato Remoto
                            </button>
                        </div>
                        {remoteData.length === 0 ? (
                            <div className="alert alert-warning text-center">No hay datos que coincidan con la búsqueda.</div>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <RemotosList remoteData={remoteData} setRemoteData={setRemoteData} onRemoteDataDeleted={fetchRemoteData} />
                            </div>
                        )}
                        <RemotosChart />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeRemotos;