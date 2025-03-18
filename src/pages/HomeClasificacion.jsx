import { useNavigate } from "react-router-dom";
import ClasificacionList from "../components/clasificacion_paquetes/ClasificacionList";
import ClasificacionCreate from "../components/clasificacion_paquetes/ClasificacionCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeClasificacion = () => {
    const navigate = useNavigate();
    const [packageClassifications, setPackageClassifications] = useState([]);
    const [filters, setFilters] = useState({
        etiquetaColor: "",
        accion: "",
        idProducto: "",
    });

    useEffect(() => {
        fetchPackageClassifications();
    }, [filters]);

    
    const fetchPackageClassifications = () => {
        axios.get("http://localhost:3000/api/clasificacion_paquetes", { params: filters })
            .then(response => setPackageClassifications(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchPackageClassifications();
    };

    const handleDeleted = () => {
        fetchPackageClassifications();
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

            
            axios.post("http://localhost:3000/api/clasificacion_paquetes/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchPackageClassifications();
                })
                .catch(error => console.error("Error al importar datos de clasificación:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(packageClassifications);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clasificación de Paquetes");
        XLSX.writeFile(workbook, "clasificacion_paquetes.xlsx");
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
            <div className="p-4" style={{ marginLeft: "250px" }}>
                <div className="mb-4">
                    <ClasificacionCreate onPackageClassificationAdded={handleAdded} />
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
                        <label className="form-label">Filtrar por Etiqueta de Color</label>
                        <input
                            type="text"
                            name="etiquetaColor"
                            value={filters.etiquetaColor}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Ingrese etiqueta de color"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por Acción</label>
                        <select
                            name="accion"
                            value={filters.accion}
                            onChange={handleFilterChange}
                            className="form-select"
                        >
                            <option value="">Todas</option>
                            <option value="Clasificar">Clasificar</option>
                            <option value="Rechazar">Rechazar</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Filtrar por Producto</label>
                        <input
                            type="number"
                            name="idProducto"
                            value={filters.idProducto}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Ingrese ID de Producto"
                        />
                    </div>
                </div>
                <div>
                    <div className="card-body">
                        {packageClassifications.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <ClasificacionList
                                packageClassifications={packageClassifications}
                                setPackageClassifications={setPackageClassifications}
                                onPackageClassificationDeleted={handleDeleted}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeClasificacion;
