import { useState, useEffect } from "react";
import axios from "axios";

const ProductosEdit = ({ productoEdit, onProductoSaved }) => {
    const [producto, setProducto] = useState({
        Nombre: "",
        Stock: 0
    });

    useEffect(() => {
        if (productoEdit) {
            setProducto({
                Nombre: productoEdit.Nombre,
                Stock: productoEdit.Stock
            });
        }
    }, [productoEdit]);

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (productoEdit) {
                await axios.put(`https://54.208.187.128/productos/edit/${productoEdit.ID_Producto}`, producto);
                alert("Producto actualizado");
            } else {
                await axios.post("https://54.208.187.128/productos/create", producto);
                alert("Producto agregado");
            }
            onProductoSaved();
            setProducto({ Nombre: "", Stock: 0 });
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h3 className="text-center">{productoEdit ? "Editar Producto" : "Agregar Producto"}</h3>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="Nombre" value={producto.Nombre} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" name="Stock" value={producto.Stock} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary">
                    {productoEdit ? "Actualizar" : "Agregar"}
                </button>
            </form>
        </div>
    );
};

export default ProductosEdit;