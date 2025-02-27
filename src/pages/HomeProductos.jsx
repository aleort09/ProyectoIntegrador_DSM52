import { useNavigate } from "react-router-dom";
import ProductosList from "../components/productos/ProductosList";
import ProductosCreate from "../components/productos/ProductosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeProductos = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [filters, setFilters] = useState({
        estado: "",
        peso: "",
        destino: ""
    });

    useEffect(() => {
        fetchProductos();
    }, [filters]);

    const fetchProductos = () => {
        axios.get("http://localhost:3000/api/paquetes", { params: filters })
            .then(response => setProductos(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchProductos();
    };

    const handleDeleted = () => {
        fetchProductos();
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

            axios.post("http://localhost:3000/api/paquetes/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchProductos();
                })
                .catch(error => console.error("Error al importar productos:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(productos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
        XLSX.writeFile(workbook, "productos.xlsx");
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
                <h1 className="text-center mb-4">Gestión de Paquetes</h1>
                <div className="mb-4">
                    <ProductosCreate onProductoAdded={handleAdded} />
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
                            <option value="En tránsito">En tránsito</option>
                            <option value="Entregado">Entregado</option>
                            <option value="Pendiente">Pendiente</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por Peso (kg)</label>
                        <select
                            name="peso"
                            value={filters.peso}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Todos</option>
                            <option value="0-10">0 - 10 kg</option>
                            <option value="11-20">11 - 20 kg</option>
                            <option value="21-30">21 - 30 kg</option>
                            <option value="31+">31+ kg</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por Destino</label>
                        <input
                            type="text"
                            name="destino"
                            placeholder="Ingrese el destino"
                            value={filters.destino}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        {productos.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <ProductosList
                            productos={productos}
                            setProductos={setProductos}
                            onProductoDeleted={handleDeleted}
                        />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeProductos;