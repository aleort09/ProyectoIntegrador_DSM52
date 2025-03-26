import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import Menu from "../components/Menu";
import ProductosList from "../components/productos/ProductosList";
import ProductosChart from "../components/charts/ProductosChart";

const HomeProductos = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [filters, setFilters] = useState({ nombre: "" });
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        fetchProductos();
    }, [filters]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const fetchProductos = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("https://ravendev.jeotech.x10.mx/productos", { params: filters });
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
        setLoading(false);
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async (e) => {
            try {
                const workbook = XLSX.read(e.target.result, { type: "binary" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                const response = await axios.post("https://ravendev.jeotech.x10.mx/importar/productos", jsonData);
                Swal.fire("¡Éxito!", response.data.message, "success");
                fetchProductos();
            } catch (error) {
                console.error("Error al importar productos:", error);
                Swal.fire("Error", "Hubo un problema al importar los productos.", "error");
            }
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(productos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
        XLSX.writeFile(workbook, "productos.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Productos", 10, 10);
        autoTable(doc, {
            head: [["ID", "Nombre", "Stock", "Fecha de Registro"]],
            body: productos.map(({ ID_Producto, Nombre, Stock, Fecha_Registro }) => [
                ID_Producto, Nombre, Stock, new Date(Fecha_Registro).toLocaleDateString()
            ]),
        });
        doc.save("productos.pdf");
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Menu />
            <div className="main-content" style={{ marginLeft: isMobile ? "0" : "200px", marginTop: isMobile ? "30px" : "0", padding: "5px", transition: "all 0.3s ease" }}>
                <div className="p-4">
                    <h2 className="text-center">Gestión de Productos</h2>
                    <div className="mb-3">
                        <label className="form-label">Importar productos desde Excel</label>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="form-control mb-2" />
                        <div className="d-flex gap-2">
                            <button onClick={exportToExcel} className="btn btn-success flex-grow-1">Exportar a Excel</button>
                            <button onClick={exportToPDF} className="btn btn-danger flex-grow-1">Exportar a PDF</button>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Filtrar por Nombre</label>
                            <input type="text" name="nombre" placeholder="Ingrese el nombre" value={filters.nombre} onChange={handleFilterChange} className="form-control" />
                        </div>
                    </div>
                    <div className="card-body">
                        <button onClick={() => navigate("/productos/create")} className="btn btn-primary">
                            <FaPlus /> Crear Producto
                        </button>
                        {loading ? (
                            <div className="text-center">Cargando...</div>
                        ) : productos.length === 0 ? (
                            <div className="alert alert-warning text-center">No hay productos disponibles.</div>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <ProductosList productos={productos} setProductos={setProductos} onProductoDeleted={fetchProductos} />
                            </div>
                        )}
                        <ProductosChart productos={productos} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeProductos;
