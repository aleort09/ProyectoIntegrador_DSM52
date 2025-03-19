import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ProductosChart = ({ productos }) => {
    // Colores para el gráfico de pastel
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

    // Datos para el gráfico de barras
    const barData = {
        labels: productos.map((producto) => producto.Nombre), // Nombres de los productos
        datasets: [
            {
                label: "Stock",
                data: productos.map((producto) => producto.Stock), // Stock de los productos
                backgroundColor: "#82ca9d",
                borderColor: "#82ca9d",
                borderWidth: 1,
            },
        ],
    };

    // Datos para el gráfico de pastel
    const pieData = {
        labels: productos.map((producto) => producto.Nombre), // Nombres de los productos
        datasets: [
            {
                label: "Distribución de Stock",
                data: productos.map((producto) => producto.Stock), // Stock de los productos
                backgroundColor: COLORS,
                borderColor: COLORS,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Estadísticas de Productos</h3>

            <div className="row">
                {/* 📊 Gráfico de Barras */}
                <div className="col-md-6">
                    <h5 className="text-center">Stock de Productos</h5>
                    <div style={{ height: "300px" }}>
                        <Bar
                            data={barData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                                plugins: {
                                    legend: {
                                        position: "top",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {/* 🍩 Gráfico de Pastel */}
                <div className="col-md-6">
                    <h5 className="text-center">Distribución de Productos</h5>
                    <div style={{ height: "300px" }}>
                        <Pie
                            data={pieData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const label = context.label || "";
                                                const value = context.raw || 0;
                                                return `${label}: ${value}`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductosChart;