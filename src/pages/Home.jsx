import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faTachometerAlt, faBell, faCogs, faHistory, faStopCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const Home = () => {
    const [user, setUser] = useState(null);
    const [systemStatus, setSystemStatus] = useState("Cargando...");
    const [stock, setStock] = useState({});
    const [recentActivity, setRecentActivity] = useState([]);
    const [trendData, setTrendData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`https://ravendev.jeotech.x10.mx/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Error al obtener usuario:", error));
        }
    }, []);

    useEffect(() => {
        const fetchSystemData = async () => {
            try {
                const detections = await axios.get("https://ravendev.jeotech.x10.mx/detecciones");
                const latestDetection = detections.data[0];
                setSystemStatus(latestDetection?.Estado || "Desconocido");

                const classifications = await axios.get("https://ravendev.jeotech.x10.mx/clasificaciones");
                const classificationData = classifications.data;

                // Stock por color
                const stockData = classificationData.reduce((acc, item) => {
                    acc[item.Etiqueta_Color] = (acc[item.Etiqueta_Color] || 0) + 1;
                    return acc;
                }, {});
                setStock(stockData);

                // Agrupar por día para tendencia
                const tendenciaPorDia = new Array(7).fill(0); // [Dom, Lun, Mar, Mié, Jue, Vie, Sáb]
                classificationData.forEach(item => {
                    const dia = new Date(item.Fecha_Hora).getDay(); // 0 = domingo
                    tendenciaPorDia[dia]++;
                });
                setTrendData(tendenciaPorDia);

                // Actividad reciente (últimos 5)
                const recientes = classificationData
                    .sort((a, b) => new Date(b.Fecha_Hora) - new Date(a.Fecha_Hora))
                    .slice(0, 5);
                setRecentActivity(recientes);

                setLoading(false);
            } catch (error) {
                console.error("Error al obtener datos del sistema:", error);
                setLoading(false);
            }
        };

        fetchSystemData();
    }, []);

    const stockChartData = {
        labels: Object.keys(stock),
        datasets: [
            {
                label: "Stock Actual",
                data: Object.values(stock),
                backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0", "#ffcd56"],
            },
        ],
    };

    const trendChartData = {
        labels: diasSemana,
        datasets: [
            {
                label: "Productos Clasificados",
                data: trendData,
                borderColor: "#36a2eb",
                fill: false,
            },
        ],
    };

    if (!user || loading) return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="loading-screen"
        >
            <p className="loading-text">Cargando datos del sistema...</p>
        </motion.div>
    );

    return (
        <>
            <Navbar />
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mt-4"
            >
                <h1 className="welcome-title">Bienvenido, {user.Nombre} {user.Apellido}</h1>
                <p className="welcome-subtitle">Estado del sistema y resumen de stock:</p>
                <div className="dashboard-cards">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="dashboard-card"
                    >
                        <FontAwesomeIcon icon={faBox} className="card-icon" />
                        <h3>Stock Actual</h3>
                        <ul className="stock-list">
                            {Object.entries(stock).map(([color, cantidad]) => (
                                <li key={color}>
                                    <span>{color}:</span> {cantidad} unidades
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Gráficos */}
                <div className="chart-container">
                    <h2>Stock por Color</h2>
                    <Bar data={stockChartData} options={{ responsive: true }} />
                </div>

                <div className="chart-container">
                    <h2>Tendencia de Clasificación</h2>
                    <Line data={trendChartData} options={{ responsive: true }} />
                </div>

                {/* Actividad reciente */}
                <div className="recent-activity">
                    <h2>Actividad Reciente</h2>
                    <ul>
                        {recentActivity.map(activity => (
                            <li key={activity.ID_Clasificacion}>
                                <FontAwesomeIcon icon={faHistory} />
                                <span>Producto <strong>{activity.Etiqueta_Color}</strong> clasificado el <strong>{new Date(activity.Fecha_Hora).toLocaleString()}</strong></span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </>
    );
};

export default Home;
