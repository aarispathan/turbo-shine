/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import { Container } from "react-bootstrap";
import ScrollToTop from "../../components/scrollToTop/Scroll";
import HomeSwiper from "../../components/home-swiper/HomeSwiper";
import Loader from "../../components/loader/Loader";
import "./home.css";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTimeout, setLoadingTimeout] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoadingTimeout(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Container style={{ marginTop: "40px" }}>
            <HomeSwiper />
            <ScrollToTop />
        </Container>
    );
}

export default Home;
