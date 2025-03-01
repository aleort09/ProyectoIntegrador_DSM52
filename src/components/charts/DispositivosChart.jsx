import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const DispositivosChart = ({ dispositivos }) => {
    // Paleta de colores atractivos
    const colores = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
        "#FF9F40", "#E7E9ED", "#8C9EFF", "#00CC99", "#FF99CC"
    ];

    // Función para contar dispositivos por categoría
    const contarPorCategoria = (categoria) => {
        return dispositivos.reduce((acc, dispositivo) => {
            const key = dispositivo[categoria];
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    };

    // Datos para el gráfico de estados
    const estados = contarPorCategoria("Estado");
    const dataEstados = {
        labels: Object.keys(estados),
        datasets: [
            {
                label: "Dispositivos por Estado",
                data: Object.values(estados),
                backgroundColor: colores.slice(0, Object.keys(estados).length),
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    // Datos para el gráfico de tipos
    const tipos = contarPorCategoria("Tipo");
    const dataTipos = {
        labels: Object.keys(tipos),
        datasets: [
            {
                label: "Dispositivos por Tipo",
                data: Object.values(tipos),
                backgroundColor: colores.slice(0, Object.keys(tipos).length),
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    // Opciones comunes para ambos gráficos
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 14,
                        family: "Arial, sans-serif",
                    },
                    color: "#333",
                },
            },
            title: {
                display: true,
                font: {
                    size: 18,
                    family: "Arial, sans-serif",
                },
                color: "#333",
                padding: 20,
            },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: {
                    size: 16,
                },
                bodyFont: {
                    size: 14,
                },
            },
        },
        animation: {
            animateScale: true, // Animación de escala
            animateRotate: true, // Animación de rotación
        },
    };

    return (
        <div className="row mt-4">
            <div className="col-md-6">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4">Dispositivos por Estado</h5>
                        <Pie data={dataEstados} options={options} />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title text-center mb-4">Dispositivos por Tipo</h5>
                        <Pie data={dataTipos} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispositivosChart;