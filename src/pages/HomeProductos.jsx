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

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = () => {
        axios.get("http://localhost:3000/api/paquetes")
            .then(response => setProductos(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchProductos();
    };

    const handleDeleted = () => {
        fetchProductos();
    };

    // 📌 Función para manejar la subida del archivo Excel
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

            // Enviar los datos al backend
            axios.post("http://localhost:3000/api/paquetes/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchProductos(); // Refrescar la lista de productos
                })
                .catch(error => console.error("Error al importar productos:", error));
        };
    };

    // 📌 Función para exportar datos a Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(productos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
        XLSX.writeFile(workbook, "productos.xlsx");
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Productos</h1>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <button onClick={exportToExcel}>Exportar a Excel</button> {/* 📌 Botón de exportación */}
                <ProductosCreate onProductoAdded={handleAdded} />
                <ProductosList productos={productos} setProductos={setProductos} onProductoDeleted={handleDeleted} />
            </div>
        </>
    );
};

export default HomeProductos;