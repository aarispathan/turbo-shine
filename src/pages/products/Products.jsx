import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../services/api";
import ProductCard from "../../components/productcard/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import ScrollToTop from "../../components/scrollToTop/Scroll";
import SearchBar from "../../components/searchbar/SearchBar";
import FilterCard from "../../components/filtercards/FilterCard";
import "./product.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });

    useEffect(() => {
        fetchProducts()
            .then((productsArray) => setProducts(productsArray))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;

    const filterProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            !selectedCategory || product.category === selectedCategory;

        const price = parseFloat(product.price);
        const min = parseFloat(priceRange.min) || 0;
        const max = parseFloat(priceRange.max) || Infinity;

        const matchesPrice = price >= min && price <= max;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const categories = [...new Set(products.map((p) => p.category))];

    return (
        <Container style={{ marginTop: "80px" }} className="product-container">
            <ScrollToTop />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterCard
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
                setPriceRange={setPriceRange}
            />
            <Row>
                {filterProducts.map((product) => (
                    <Col
                        className="product-col"
                        key={product.id}
                        xs={12}
                        sm={6}
                        md={3}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Products;
