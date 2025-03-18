import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ProductosEdit from "./ProductosEdit";
import ProductosChart from "../charts/ProductosChart";  

const ProductosList = () => {
    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState(""); 
    const [productoEdit, setProductoEdit] = useState(null); 
    const [loading, setLoading] = useState(true);

    
    const fetchProductos = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/productos");
            setProductos(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchProductos();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            try {
                await axios.delete(`http://localhost:3000/api/productos/delete/${id}`);
                alert("Producto eliminado");
                fetchProductos(); // Refrescar los productos después de eliminar
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        }
    };

    
    const handleEdit = (producto) => {
        setProductoEdit(producto);
    };

    
    const productosFiltrados = productos.filter(producto =>
        producto.Nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        producto.Stock.toString().includes(filtro)
    );

    
    const exportToExcel = () => {
        const hoja = XLSX.utils.json_to_sheet(productosFiltrados);
        const libro = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(libro, hoja, "Productos");
        const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "productos.xlsx");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Lista de Productos</h2>

            
            {productoEdit && (
                <ProductosEdit productoEdit={productoEdit} onProductoSaved={fetchProductos} />
            )}

        
            <input 
                type="text" 
                placeholder="Buscar producto..." 
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)} 
                className="form-control my-3"
            />

        
            <button className="btn btn-success mb-3" onClick={exportToExcel}>
                Exportar a Excel
            </button>

            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosFiltrados.map((producto) => (
                        <tr key={producto.ID_Producto}>
                            <td>{producto.ID_Producto}</td>
                            <td>{producto.Nombre}</td>
                            <td>{producto.Stock}</td>
                            <td>{new Date(producto.Fecha_Registro).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(producto)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(producto.ID_Producto)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <ProductosChart productos={productosFiltrados} />
        </div>
    );
};

export default ProductosList;
