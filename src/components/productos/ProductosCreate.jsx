import { useState } from "react";
import axios from "axios";

const ProductosCreate = ({ onProductoAdded }) => {
    const [producto, setProducto] = useState({
        Nombre: "",
        Stock: 0,
    });

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://54.208.187.128/productos/create", producto)
            .then(() => {
                alert("Producto registrado");
                onProductoAdded();
                setProducto({ Nombre: "", Stock: 0 }); 
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Agregar Producto</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input type="text" name="Nombre" value={producto.Nombre} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" name="Stock" value={producto.Stock} onChange={handleChange} className="form-control" required min="0" />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Producto</button>
            </form>
        </div>
    );
};

export default ProductosCreate;
