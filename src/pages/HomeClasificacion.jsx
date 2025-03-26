import { useNavigate } from "react-router-dom";
import ClasificacionList from "../components/clasificacion_paquetes/ClasificacionList";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";
import { FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import ClasificacionChart from "../components/charts/ClasificacionChart";

const HomeClasificacion = () => {
    const navigate = useNavigate();
    const [packageClassifications, setPackageClassifications] = useState([]);
    const [filters, setFilters] = useState({ etiqueta_color: "", accion: "" });
    const [loading, setLoading] = useState(false);

    const fetchPackageClassifications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://ravendev.jeotech.x10.mx/clasificaciones", { params: filters });
            setPackageClassifications(response.data);
        } catch (error) {
            console.error("Error fetching classifications:", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchPackageClassifications();
    }, [fetchPackageClassifications]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

                await axios.post("https://ravendev.jeotech.x10.mx/importar/clasificacion_paquetes", jsonData);
                Swal.fire("¡Éxito!", "Clasificaciones importadas correctamente", "success");
                fetchPackageClassifications();
            } catch (error) {
                console.error("Error importing classifications:", error);
                Swal.fire("Error", "Hubo un problema al importar", "error");
            }
        };
        reader.readAsBinaryString(file);
    };

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(packageClassifications), "Clasificaciones");
        XLSX.writeFile(workbook, "clasificaciones.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Clasificaciones", 10, 10);
        autoTable(doc, {
            head: [["ID", "ID_Producto", "Color", "Acción", "Fecha"]],
            body: packageClassifications.map(({ ID_Clasificacion, ID_Producto, Etiqueta_Color, Accion, Fecha_Hora }) => [
                ID_Clasificacion,
                ID_Producto,
                Etiqueta_Color,
                Accion,
                new Date(Fecha_Hora).toLocaleDateString(),
            ]),
        });
        doc.save("clasificaciones.pdf");
    };

    const handleFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Menu />
            <div className="main-content" style={{ marginLeft: isMobile ? "0" : "200px", marginTop: isMobile ? "30px" : "0", padding: "5px" }}>
                <div className="p-4">
                    <h2 className="text-center">Gestión de Clasificaciones</h2>
                    <div className="mb-3">
                        <label className="form-label">Importar desde Excel</label>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="form-control mb-2" />
                        <div className="d-flex gap-2">
                            <button onClick={exportToExcel} className="btn btn-success flex-grow-1">Exportar a Excel</button>
                            <button onClick={exportToPDF} className="btn btn-danger flex-grow-1">Exportar a PDF</button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Filtrar por Color:</label>
                            <select name="etiqueta_color" value={filters.etiqueta_color} onChange={handleFilterChange} className="form-select">
                                <option value="">Todos</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Verde">Verde</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Filtrar por Acción:</label>
                            <select name="accion" value={filters.accion} onChange={handleFilterChange} className="form-select">
                                <option value="">Todas</option>
                                <option value="Izquierda">Izquierda</option>
                                <option value="Derecha">Derecha</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-body">
                        <button onClick={() => navigate("/clasificacion_paquetes/create")} className="btn btn-primary mb-4">
                            <FaPlus /> Crear Clasificación
                        </button>
                        {loading ? (
                            <div className="text-center">Cargando...</div>
                        ) : packageClassifications.length === 0 ? (
                            <div className="alert alert-warning text-center">No hay clasificaciones disponibles.</div>
                        ) : (
                            <ClasificacionList packageClassifications={packageClassifications} onPackageClassificationDeleted={fetchPackageClassifications} />
                        )}
                        <div className="mt-5" style={{ overflowX: "auto" }}>
                            <ClasificacionChart clasificaciones={packageClassifications} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeClasificacion;