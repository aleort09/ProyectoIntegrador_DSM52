import { useNavigate } from "react-router-dom";
import ProductosList from "../components/productos/ProductosList";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";
import { FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

const HomeProductos = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [filters, setFilters] = useState({
        nombre: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProductos();
    }, [filters]);

    const fetchProductos = () => {
        setLoading(true);
        axios
            .get("https://54.208.187.128/productos", { params: filters })
            .then((response) => {
                setProductos(response.data);
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
                .post("https://54.208.187.128/importar/productos", jsonData)
                .then((response) => {
                    Swal.fire({
                        title: "¡Éxito!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    fetchProductos();
                })
                .catch((error) => {
                    console.error("Error al importar productos:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al importar los productos.",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                });
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
            body: productos.map((producto) => [
                producto.ID_Producto,
                producto.Nombre,
                producto.Stock,
                new Date(producto.Fecha_Registro).toLocaleDateString(),
            ]),
        });
        doc.save("productos.pdf");
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
                    <h2 className="text-center">Gestión de Productos</h2>
                    <div className="mb-3">
                        <label className="form-label">Importar productos desde Excel</label>
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
                            <label className="form-label">Filtrar por Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Ingrese el nombre"
                                value={filters.nombre}
                                onChange={handleFilterChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="card-body">
                            <button onClick={() => navigate("/productos/create")} className="btn btn-primary">
                                <FaPlus /> Crear Producto
                            </button>
                            {loading ? (
                                <div className="text-center">Cargando...</div>
                            ) : productos.length === 0 ? (
                                <div className="alert alert-warning text-center">
                                    No hay productos disponibles.
                                </div>
                            ) : (
                                <ProductosList
                                    productos={productos}
                                    setProductos={setProductos}
                                    onProductoDeleted={fetchProductos}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeProductos;