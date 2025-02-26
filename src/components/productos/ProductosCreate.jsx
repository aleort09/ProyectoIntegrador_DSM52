import { useState } from "react";
import axios from "axios";

const ProductosCreate = ({ onProductoAdded }) => {
    const [producto, setProducto] = useState({
        ID_Usuario: "",
        Peso: "",
        Dimensiones: "",
        Destino: "",
        Estado: "En tránsito",
    });

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/paquetes/create", producto)
            .then(() => {
                alert("Paquete registrado");
                onProductoAdded();
                setProducto({
                    ID_Usuario: "",
                    Peso: "",
                    Dimensiones: "",
                    Destino: "",
                    Estado: "En tránsito",
                });
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Crear Paquete</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label className="form-label">ID Usuario</label>
                    <input type="text" name="ID_Usuario" value={producto.ID_Usuario} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Peso (kg)</label>
                    <input type="number" name="Peso" value={producto.Peso} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dimensiones</label>
                    <input type="text" name="Dimensiones" value={producto.Dimensiones} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Destino</label>
                    <input type="text" name="Destino" value={producto.Destino} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select name="Estado" value={producto.Estado} onChange={handleChange} className="form-select" required>
                        <option value="En tránsito">En tránsito</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Retrasado">Retrasado</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Agregar Paquete</button>
            </form>
        </div>
    );
};

export default ProductosCreate;