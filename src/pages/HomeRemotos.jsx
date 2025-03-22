import { useNavigate } from "react-router-dom";
import RemotosList from "../components/datos_remotos/RemotosList";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";
import { FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

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

    const fetchRemoteData = () => {
        axios.get("https://ravendev.jeotech.x10.mx/remotos", { params: filters })
            .then(response => setRemoteData(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => fetchRemoteData();
    const handleDeleted = () => fetchRemoteData();

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

            axios.post("https://ravendev.jeotech.x10.mx/importar/datos_remotos", jsonData)
                .then(response => {
                    Swal.fire({
                        title: "¡Éxito!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    fetchRemoteData();
                })
                .catch(error => {
                    console.error("Error al importar datos remotos:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al importar los datos remotos.",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
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
            body: remoteData.map(data => [
                data.ID_Remoto,
                data.Estado_Conexion,
                data.ID_Deteccion,
                data.ID_Clasificacion,
                new Date(data.Fecha_Hora).toLocaleDateString(),
            ]),
        });
        doc.save("datos_remotos.pdf");
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const containerStyle = {
        marginLeft: isMobile ? "0" : "200px",
        marginTop: isMobile ? "30px" : "0",
        padding: "5px",
        transition: "all 0.3s ease"
    };

    return (
        <>
            <Menu />
            <div className="main-content" style={containerStyle}>
                <div className="p-4">
                    <h2 className="text-center">Gestión de Datos Remotos</h2>
                    <div className="mb-3">
                        <label className="form-label">Importar Datos Remotos desde Excel</label>
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                            className="form-control mb-2"
                        />
                        <div className="d-flex gap-2">
                            <button onClick={exportToExcel} className="btn btn-success flex-grow-1">
                                Exportar a Excel
                            </button>
                            <button onClick={exportToPDF} className="btn btn-danger flex-grow-1">
                                Exportar a PDF
                            </button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <select
                                name="estadoConexion"
                                value={filters.estadoConexion}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Filtrar por Estado de Conexión</option>
                                <option value="Conectado">Conectado</option>
                                <option value="Desconectado">Desconectado</option>
                                <option value="Error">Error</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <input
                                type="number"
                                name="idDeteccion"
                                value={filters.idDeteccion}
                                onChange={handleFilterChange}
                                className="form-control"
                                placeholder="Filtrar por ID de Detección"
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="number"
                                name="idClasificacion"
                                value={filters.idClasificacion}
                                onChange={handleFilterChange}
                                className="form-control"
                                placeholder="Filtrar por ID de Clasificación"
                            />
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mb-4">
                            <button onClick={() => navigate("/remotos/create")} className="btn btn-primary">
                                <FaPlus /> Crear Dato Remoto
                            </button>
                        </div>
                        {remoteData.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <RemotosList
                                    remoteData={remoteData}
                                    setRemoteData={setRemoteData}
                                    onRemoteDataDeleted={handleDeleted}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeRemotos;
