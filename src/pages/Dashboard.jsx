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
            overlayColor: "rgba(0, 123, 255, 0.5)" // Azul
        },
        {
            title: "Clasificación de Paquetes",
            link: "/clasificacion_paquetes",
            image: "/eventos.jpg",
            overlayColor: "rgba(40, 167, 69, 0.5)" // Verde
        },
        {
            title: "Datos Remotos",
            link: "/remotos",
            image: "/lecturas.jpg",
            overlayColor: "rgba(220, 53, 69, 0.5)" // Rojo
        },
        {
            title: "Productos",
            link: "/productos",
            image: "/paquetes.webp",
            overlayColor: "rgba(255, 193, 7, 0.5)" // Amarillo
        },
        {
            title: "Usuarios",
            link: "/usuarios",
            image: "/users.jpg",
            overlayColor: "rgba(23, 162, 184, 0.5)" // Cian
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

    const arrowButtonStyle = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        border: "none",
        color: "white",
        fontSize: "2rem",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        borderRadius: "50%"
    };

    const CustomLeftArrow = ({ onClick }) => (
        <button onClick={onClick} style={{ ...arrowButtonStyle, left: "20px" }}>
            ‹
        </button>
    );

    const CustomRightArrow = ({ onClick }) => (
        <button onClick={onClick} style={{ ...arrowButtonStyle, right: "20px" }}>
            ›
        </button>
    );


    return (
        <Carousel
            responsive={{
                all: {
                    breakpoint: { max: 4000, min: 0 },
                    items: 1
                }
            }}
            autoPlay={true}
            autoPlaySpeed={5000}
            infinite={true}
            showDots={true}
            arrows={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            containerClass="carousel-container"
            itemClass="carousel-item-fullscreen"
        >
            {cards.map((card, index) => (
                <Link to={card.link} key={index} className="text-decoration-none">
                    <div className="position-relative" style={{ width: "100vw", height: "100vh" }}>
                        <img
                            src={card.image}
                            alt={card.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                        <div
                            className="position-absolute top-50 start-50 translate-middle p-4 rounded shadow-lg"
                            style={{
                                backgroundColor: card.overlayColor,
                                minWidth: "300px",
                                maxWidth: "90%",
                                textAlign: "center"
                            }}
                        >
                            <h1 className="text-white fw-bold">{card.title}</h1>
                        </div>
                    </div>
                </Link>
            ))}
        </Carousel>

    );
};

export default Dashboard;
