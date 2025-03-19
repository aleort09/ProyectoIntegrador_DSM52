import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ClasificacionChart = () => {
  const [clasificaciones, setClasificaciones] = useState([]);

  useEffect(() => {
    fetchClasificaciones();
  }, []);

  const fetchClasificaciones = async () => {
    try {
      const response = await axios.get("https://54.208.187.128/clasificaciones");
      setClasificaciones(response.data);
    } catch (err) {
      console.error("Error al obtener clasificaciones", err);
    }
  };

  // Procesar datos para gráfico de barras (cantidad por color)
  const etiquetasContadas = clasificaciones.reduce((acc, item) => {
    acc[item.Etiqueta_Color] = (acc[item.Etiqueta_Color] || 0) + 1;
    return acc;
  }, {});

  const dataBarras = {
    labels: Object.keys(etiquetasContadas),
    datasets: [
      {
        label: "Cantidad por Color",
        data: Object.values(etiquetasContadas),
        backgroundColor: "#8884d8",
        borderColor: "#8884d8",
        borderWidth: 1,
      },
    ],
  };

  // Procesar datos para gráfico de pastel (proporción de acciones)
  const accionesContadas = clasificaciones.reduce((acc, item) => {
    acc[item.Accion] = (acc[item.Accion] || 0) + 1;
    return acc;
  }, {});

  const dataPie = {
    labels: Object.keys(accionesContadas),
    datasets: [
      {
        label: "Distribución de Acciones",
        data: Object.values(accionesContadas),
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
        borderColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Gráficas de Clasificación</h2>

      {/* Gráfico de Barras */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Clasificaciones por Color</h3>
        <div style={{ height: "300px" }}>
          <Bar
            data={dataBarras}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      {/* Gráfico de Pastel */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Distribución de Acciones</h3>
        <div style={{ height: "300px" }}>
          <Pie
            data={dataPie}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClasificacionChart;