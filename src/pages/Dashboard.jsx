import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            axios.get(`https://ravendev.jeotech.x10.mx/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error("Error al obtener usuario:", error));
        }
    }, []);

    if (!user) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3">Cargando datos del usuario...</p>
            </div>
        );
    }

    const cards = [
        {
            title: "Detección de Paquetes",
            link: "/deteccion_paquetes",
            image: "/dis.png",
            bg: "bg-primary text-white"
        },
        {
            title: "Clasificación de Paquetes",
            link: "/clasificacion_paquetes",
            image: "/eventos.jpg",
            bg: "bg-success text-white"
        },
        {
            title: "Datos Remotos",
            link: "/remotos",
            image: "/lecturas.jpg",
            bg: "bg-danger text-white"
        },
        {
            title: "Productos",
            link: "/productos",
            image: "/paquetes.webp",
            bg: "bg-warning text-dark"
        },
        {
            title: "Usuarios",
            link: "/usuarios",
            image: "/users.jpg",
            bg: "bg-info text-white"
        }
    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1200 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 1200, min: 992 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 992, min: 768 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-4 display-5 fw-bold">Bienvenido, {user.Nombre} {user.Apellido}</h1>
            <p className="text-muted mb-4">Selecciona una opción para continuar</p>

            <Carousel
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={3000}
                infinite={true}
                showDots={true}
                arrows={true}
                containerClass="carousel-container"
                itemClass="px-3"
            >
                {cards.map((card, index) => (
                    <Link to={card.link} key={index} className="text-decoration-none">
                        <div className="card shadow-lg h-100 hover-scale" style={{ borderRadius: "15px", overflow: "hidden" }}>
                            <img 
                                src={card.image} 
                                alt={card.title} 
                                className="card-img-top"
                                style={{ height: "170px", objectFit: "cover" }}
                            />
                            <div className={`card-body ${card.bg}`}>
                                <h5 className="card-title">{card.title}</h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </div>
    );
};

export default Dashboard;
