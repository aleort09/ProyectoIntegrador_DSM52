import { useNavigate } from "react-router-dom";
import ClasificacionList from "../components/clasificacion_paquetes/ClasificacionList";
import { useEffect, useState } from "react";
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
    const [filters, setFilters] = useState({
        etiqueta_color: "",
        accion: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPackageClassifications();
    }, [filters]);

    const fetchPackageClassifications = () => {
        setLoading(true);
        axios
            .get("https://ravendev.jeotech.x10.mx/clasificaciones", { params: filters })
            .then((response) => {
                setPackageClassifications(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
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

            axios
                .post("https://ravendev.jeotech.x10.mx/importar/clasificacion_paquetes", jsonData)
                .then((response) => {
                    Swal.fire({
                        title: "¡Éxito!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    fetchPackageClassifications();
                })
                .catch((error) => {
                    console.error("Error al importar clasificaciones:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al importar las clasificaciones.",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                });
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(packageClassifications);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clasificaciones");
        XLSX.writeFile(workbook, "clasificaciones.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Clasificaciones", 10, 10);
        autoTable(doc, {
            head: [["ID", "ID_Producto", "Color de etiqueta", "Acción", "Fecha de Registro"]],
            body: packageClassifications.map((pkg) => [
                pkg.ID_Clasificacion,
                pkg.ID_Producto,
                pkg.Etiqueta_Color,
                pkg.Accion,
                new Date(pkg.Fecha_Hora).toLocaleDateString(),
            ]),
        });
        doc.save("clasificaciones.pdf");
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
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
        transition: "all 0.3s ease",
    };

    return (
        <>
            <Menu />
            <div className="main-content" style={containerStyle}>
                <div className="p-4">
                    <h2 className="text-center">Gestión de Clasificaciones</h2>
                    <div className="mb-3">
                        <label className="form-label">Importar clasificaciones desde Excel</label>
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
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Filtrar por Color:</label>
                            <select
                                name="etiqueta_color"
                                value={filters.etiqueta_color}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Todos los colores</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Verde">Verde</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Filtrar por Acción:</label>
                            <select
                                name="accion"
                                value={filters.accion}
                                onChange={handleFilterChange}
                                className="form-select"
                            >
                                <option value="">Todas las acciones</option>
                                <option value="Izquierda">Izquierda</option>
                                <option value="Derecha">Derecha</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="mb-4">
                            <button onClick={() => navigate("/clasificacion_paquetes/create")} className="btn btn-primary">
                                <FaPlus /> Crear Clasificación
                            </button>
                        </div>
                        {loading ? (
                            <div className="text-center">Cargando...</div>
                        ) : packageClassifications.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay clasificaciones disponibles.
                            </div>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <ClasificacionList
                                    packageClassifications={packageClassifications}
                                    setPackageClassifications={setPackageClassifications}
                                    onPackageClassificationDeleted={fetchPackageClassifications}
                                />
                            </div>
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