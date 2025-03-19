import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PaquetesChart = ({ paquetes }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (paquetes.length === 0) return;

        // Preparar los datos para la gráfica
        const labels = paquetes.map((paquete) =>
            new Date(paquete.Fecha_Hora).toLocaleDateString()
        );
        const data = paquetes.map((paquete) => paquete.Distancia);

        // Crear la gráfica
        const ctx = chartRef.current.getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Distancia (cm)",
                        data: data,
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        fill: false,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Fecha",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Distancia (cm)",
                        },
                    },
                },
            },
        });

        // Limpiar la gráfica al desmontar el componente
        return () => {
            myChart.destroy();
        };
    }, [paquetes]);

    return <canvas ref={chartRef} />;
};

export default PaquetesChart;