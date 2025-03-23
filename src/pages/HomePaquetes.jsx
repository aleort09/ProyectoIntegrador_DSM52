import { useNavigate } from "react-router-dom";
import PaquetesList from "../components/deteccion_paquetes/PaquetesList";
import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";
import { FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import PaquetesChart from "../components/charts/PaquetesChart";
import isEqual from "lodash/isEqual";

const HomePaquetes = () => {
    const navigate = useNavigate();
    const [packageDetections, setPackageDetections] = useState([]);
    const [filters, setFilters] = useState({
        estado: "",
        fecha: "",
    });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const prevPackageDetections = useRef([]);

    // Función para obtener las detecciones de paquetes
    const fetchPackageDetections = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://ravendev.jeotech.x10.mx/detecciones", {
                params: filters,
            });
            const newData = response.data || [];

            // Comparar datos antiguos y nuevos para evitar actualizaciones innecesarias
            if (!isEqual(newData, prevPackageDetections.current)) {
                setPackageDetections(newData);
                prevPackageDetections.current = newData;
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al cargar los datos.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        } finally {
            setLoading(false);
        }
    };

    // Polling condicional: Verificar si hay nuevos datos cada 5 segundos
    useEffect(() => {
        fetchPackageDetections(); // Llamada inicial para cargar los datos

        const pollingInterval = setInterval(() => {
            fetchPackageDetections(); // Verificar si hay nuevos datos
        }, 5000); // Intervalo de 5 segundos

        return () => clearInterval(pollingInterval); // Limpiar el intervalo al desmontar el componente
    }, [filters]);

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

            axios
                .post("https://ravendev.jeotech.x10.mx/importar/deteccion_paquetes", jsonData)
                .then((response) => {
                    Swal.fire({
                        title: "¡Éxito!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    fetchPackageDetections();
                })
                .catch((error) => {
                    console.error("Error al importar datos de detección:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al importar los datos.",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                });
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(packageDetections);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Detección de Paquetes");
        XLSX.writeFile(workbook, "deteccion_paquetes.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Detección de Paquetes", 10, 10);
        autoTable(doc, {
            head: [["ID", "Distancia (cm)", "Estado", "Fecha y Hora"]],
            body: packageDetections.map((paquete) => [
                paquete.ID_Deteccion,
                paquete.Distancia,
                paquete.Estado,
                new Date(paquete.Fecha_Hora).toLocaleString(),
            ]),
        });
        doc.save("deteccion_paquetes.pdf");
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        setCurrentPage(1); // Reiniciar la paginación al cambiar los filtros
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

    // Memoizar el JSX de la tabla para evitar renderizados innecesarios
    const memoizedTable = useMemo(() => {
        return (
            <div  style={{ overflowX: "auto" }}>
                <PaquetesList
                key={currentPage} // Usar la página actual como clave
                packageDetections={packageDetections}
                onPackageDetectionDeleted={handleDeleted}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            </div>
        );
    }, [packageDetections, currentPage]);

    return (
        <>
            <Menu />
            <div className="p-4" style={containerStyle}>
                <h2 className="text-center">Gestión de Detección de Paquetes</h2>
                <div className="mb-3">
                    <label className="form-label">Importar detecciones desde Excel</label>
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
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Filtrar por Estado</label>
                        <select
                            name="estado"
                            value={filters.estado}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Todos</option>
                            <option value="Detectado">Detectado</option>
                            <option value="No detectado">No detectado</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Filtrar por Fecha</label>
                        <input
                            type="date"
                            name="fecha"
                            value={filters.fecha}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <button
                        onClick={() => navigate("/paquetes/create")}
                        className="btn btn-primary"
                    >
                        <FaPlus /> Crear Detección de Paquete
                    </button>
                </div>
                <div>
                    <div className="card-body">
                        {loading ? (
                            <div className="text-center">Cargando...</div>
                        ) : packageDetections.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            memoizedTable
                        )}
                    </div> 
                    <div style={{ overflowX: "auto" }}>
                        <h4>Gráfica de Distancias</h4>
                        <PaquetesChart paquetes={packageDetections} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePaquetes;