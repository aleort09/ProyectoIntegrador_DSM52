import { useNavigate } from "react-router-dom";
import EventosList from "../components/eventos/EventosList";
import EventosCreate from "../components/eventos/EventosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeEventos = () => {
    const navigate = useNavigate();
    const [eventos, setEventos] = useState([]);
    const [filters, setFilters] = useState({
        id_dispositivo: "",
        tipo_evento: ""
    });

    useEffect(() => {
        fetchEventos();
    }, [filters]); // 🔄 Se ejecuta cada vez que cambian los filtros

    const fetchEventos = () => {
        axios.get("http://localhost:3000/api/eventos", { params: filters })
            .then(response => setEventos(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => {
        fetchEventos();
    };

    const handleDeleted = () => {
        fetchEventos();
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

            axios.post("http://localhost:3000/api/eventos/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchEventos();
                })
                .catch(error => console.error("Error al importar eventos:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(eventos);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Eventos");
        XLSX.writeFile(workbook, "eventos.xlsx");
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
                <h1 className="text-center mb-4">Gestión de Eventos</h1>
                <div className="mb-4">
                    <EventosCreate onEventoAdded={handleAdded} />
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
                    <div className="col-md-6">
                        <input
                            type="number"
                            name="id_dispositivo"
                            placeholder="Filtrar por id de dispositivo"
                            value={filters.id_dispositivo}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="tipo_evento"
                            placeholder="Filtrar por tipo de evento"
                            value={filters.tipo_evento}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        {eventos.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay eventos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <EventosList
                            eventos={eventos}
                            setEventos={setEventos}
                            onEventoDeleted={handleDeleted}
                        />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeEventos;