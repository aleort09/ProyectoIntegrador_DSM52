import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Menu from "../Menu.jsx";

const ProductosEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        Nombre: "",
        Stock: 0,
    });

    useEffect(() => {
        axios
            .get(`https://ravendev.jeotech.x10.mx/productos/${id}`)
            .then((response) => setProducto(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (producto.Stock < 0) {
            Swal.fire({
                title: "Error",
                text: "El stock no puede ser negativo.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas actualizar la información del producto?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`https://ravendev.jeotech.x10.mx/productos/edit/${id}`, producto)
                    .then(() => {
                        Swal.fire({
                            title: "¡Actualizado!",
                            text: "El producto ha sido actualizado correctamente.",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        }).then(() => {
                            navigate("/productos");
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo actualizar el producto. Inténtelo de nuevo más tarde.",
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                    });
            }
        });
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
        marginLeft: isMobile ? "0" : "205px",
        marginTop: isMobile ? "30px" : "0",
        padding: "5px",
        transition: "all 0.3s ease"
    };


    return (
        <>
            <Menu />
            <div className="container mt-5" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="text-center mb-4">Editar Producto</h2>
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i>Regresar
                        </button>
                        <form onSubmit={handleSubmit} className="card p-4 shadow">
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    name="Nombre"
                                    value={producto.Nombre}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    name="Stock"
                                    value={producto.Stock}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    min="0"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Actualizar Producto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductosEdit;