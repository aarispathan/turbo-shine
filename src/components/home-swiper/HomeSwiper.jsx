import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import './homeswiper.css';
import { Col, Container, Row } from "react-bootstrap";
import AllIMG from "../../assets/all-products.jpg"
import AUDIOIMG from "../../assets/audio.webp"
import TVIMG from '../../assets/tv.jpg'
import MOBILEIMG from "../../assets/mobile.jpg"
import GAMINGIMG from "../../assets/gaming.jpg"
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
const slides = [
    {
        title: "All Products",
        description: "Browse our complete premium collection.",
        image: AllIMG,
        link: "/products"
    },
    {
        title: "Audio Devices",
        description: "Top-tier sound systems and headphones.",
        image: AUDIOIMG,
        link: "/products"

    },
    {
        title: "Mobile Phones",
        description: "Latest smartphones with cutting-edge features.",
        image: MOBILEIMG,
        link: "/products"

    },
    {
        title: "Gaming Gear",
        description: "Pro-level gaming consoles and accessories.",
        image: GAMINGIMG,
        link: "/products"

    },
    {
        title: "Smart TVs",
        description: "Experience entertainment like never before.",
        image: TVIMG,
        link: "/products"

    }
];


function HomeSwiper() {
    return (
        <section className="home-swiper-section">
            <Container>
                <Row>
                    <Col xl={4} className="d-flex align-items-center">
                        <div className="header-main">
                            <span className="home-swiper-subtitle">TURBO SHINE</span>
                            <h1 className="home-swiper-title">BUY PREMIUM PRODUCTS</h1>
                            <hr />
                            <p className="home-swiper-description">Darkwave Band from Mallorca</p>
                            <Link to='products' style={{ textDecoration: "none", color: "inherit" }}>
                                <button type="button" className="home-swiper-btn cursor-hover">
                                    <span className="button-text">Products</span><RiShoppingCartLine className="cart-icon" />
                                </button>
                            </Link>
                        </div>
                    </Col>

                    <Col xl={8}>
                        <Swiper
                            effect="coverflow"
                            grabCursor={true}
                            centeredSlides={true}
                            loop={true}
                            pagination={{ clickable: true }}
                            modules={[EffectCoverflow, Pagination]}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 3,
                                slideShadows: true,
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1560: { slidesPerView: 3 },
                            }}
                            className="swiper cursor-hover"
                        >
                            {slides.map((slide, index) => (
                                <SwiperSlide className="swiper-slide" key={index}>
                                    <Link to={slide.link} className="cursor-hover" style={{ textDecoration: "none", color: "inherit" }}>
                                        <div className="c-card">
                                            <img src={slide.image} alt={slide.title} className="c-card__image" />
                                            <h2 className="c-card__title">{slide.title}</h2>
                                            <p className="c-card__instrument">{slide.description}</p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HomeSwiper;