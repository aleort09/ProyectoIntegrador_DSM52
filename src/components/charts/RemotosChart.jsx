import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios para Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RemotosChart = () => {
  const [remotos, setRemotos] = useState([]);
  
  useEffect(() => {
    fetchRemotos();
  }, []);

  const fetchRemotos = async () => {
    try {
      const response = await axios.get("https://ravendev.jeotech.x10.mx/remotos");
      setRemotos(response.data);
    } catch (err) {
      console.error("Error al obtener los datos remotos", err);
    }
  };

  // Función para contar los estados de conexión
  const getEstadoConexionCount = () => {
    const estados = { Exitoso: 0, Fallido: 0 };

    for (let remoto of remotos) {
      if (remoto.Estado_Conexion === "Exitoso") {
        estados.Exitoso += 1;
      } else if (remoto.Estado_Conexion === "Fallido") {
        estados.Fallido += 1;
      }
    }

    return estados;
  };

  // Configuración de la gráfica
  const estados = getEstadoConexionCount();
  const data = {
    labels: ["Exitoso", "Fallido"], // Etiquetas para el gráfico
    datasets: [
      {
        label: "Estado de Conexión",
        data: [estados.Exitoso, estados.Fallido], // Datos de la gráfica
        backgroundColor: ["#4CAF50", "#F44336"], // Colores de las barras
        borderColor: ["#388E3C", "#D32F2F"], // Bordes de las barras
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Gráfico de Estado de Conexión",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Gráfico de Estado de Conexión</h2>
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RemotosChart;
