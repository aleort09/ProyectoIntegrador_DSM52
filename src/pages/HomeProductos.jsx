import { useNavigate } from "react-router-dom";
import ProductosList from "../components/productos/ProductosList";
import ProductosCreate from "../components/productos/ProductosCreate";
import { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Menu from "../components/Menu";

const HomeProductos = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = () => {
        axios.get("http://localhost:3000/api/productos")
            .then(response => setProductos(response.data))
            .catch(error => console.error(error));
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Productos</h1>
                <ProductosCreate onProductoAdded={fetchProductos} />
                <ProductosList productos={productos} setProductos={setProductos} />
            </div>
        </>
    );
};
export default HomeProductos;