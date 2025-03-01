import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LecturasChart = ({ lecturas }) => {
    // Estado para el dispositivo seleccionado
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState("");

    // Obtener la lista de dispositivos únicos
    const dispositivosUnicos = [...new Set(lecturas.map((lectura) => lectura.ID_Dispositivo))];

    // Filtrar lecturas por dispositivo seleccionado
    const lecturasFiltradas = dispositivoSeleccionado
        ? lecturas.filter((lectura) => lectura.ID_Dispositivo === dispositivoSeleccionado)
        : [];

    // Preparar datos para el gráfico
    let data = { labels: [], datasets: [] };
    if (lecturasFiltradas.length > 0) {
        // Ordenar lecturas por fecha y hora
        lecturasFiltradas.sort((a, b) => new Date(a.Fecha_Hora) - new Date(b.Fecha_Hora));

        // Etiquetas para el eje X (fechas y horas)
        const fechasHoras = lecturasFiltradas.map((lectura) =>
            new Date(lectura.Fecha_Hora).toLocaleString()
        );

        // Valores para el eje Y (valores de las mediciones)
        const valores = lecturasFiltradas.map((lectura) => lectura.Valor);

        data = {
            labels: fechasHoras, // Eje X: Fechas y horas
            datasets: [
                {
                    label: `Dispositivo ${dispositivoSeleccionado}`,
                    data: valores, // Eje Y: Valores de las mediciones
                    borderColor: "#36A2EB", // Color de la línea
                    backgroundColor: "#36A2EB",
                    borderWidth: 2,
                    fill: false, // No rellenar el área bajo la línea
                    tension: 0.4, // Suavizar la línea
                },
            ],
        };
    }

    // Opciones del gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
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
                text: dispositivoSeleccionado
                    ? `Mediciones - Dispositivo ${dispositivoSeleccionado}`
                    : "Selecciona un dispositivo",
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
                callbacks: {
                    title: (context) => `Valor: ${context[0].raw}`,
                    label: (context) => `Fecha y Hora: ${context.label}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Fecha y Hora",
                    font: {
                        size: 14,
                        family: "Arial, sans-serif",
                    },
                    color: "#333",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Valor de la Medición",
                    font: {
                        size: 14,
                        family: "Arial, sans-serif",
                    },
                    color: "#333",
                },
            },
        },
        animation: {
            duration: 1000, // Duración de la animación
            easing: "easeInOutQuart", // Tipo de animación
        },
    };

    return (
        <div>
            {/* Select para elegir el dispositivo */}
            <div className="mb-4">
                <label className="form-label">Selecciona un dispositivo:</label>
                <select
                    className="form-select"
                    value={dispositivoSeleccionado}
                    onChange={(e) => setDispositivoSeleccionado(Number(e.target.value))}
                >
                    <option value="">Selecciona...</option>
                    {dispositivosUnicos.map((dispositivo) => (
                        <option key={dispositivo} value={dispositivo}>
                            Dispositivo {dispositivo}
                        </option>
                    ))}
                </select>
            </div>

            {/* Gráfico de mediciones */}
            {dispositivoSeleccionado ? (
                <Line data={data} options={options} />
            ) : (
                <div className="alert alert-info text-center">
                    Por favor, selecciona un dispositivo para ver el gráfico.
                </div>
            )}
        </div>
    );
};

export default LecturasChart;