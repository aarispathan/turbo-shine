import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import API from '../../services/api';
import './productdetails.css';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Col, Container, Row } from 'react-bootstrap';
import { StarRating } from '../../components/productcard/ProductCard';

const ProductDetails = () => {
    const { id } = useParams();
    const { cartItems, addToCart, handleIncrease, handleDecrease } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/products/${id}`);
                setProduct(res.data.product || res.data);
            } catch (err) {
                setError("Failed to load product.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const ratingValue = useMemo(() => {
        if (product && product.rating && typeof product.rating.rate === "number") {
            return product.rating.rate;
        } else {
            return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
        }
    }, [product]);

    if (loading) return <div className='product-detail-loading' >Loading product details...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div className='product-detail-loading' >No product found.</div>;

    const cartItem = cartItems.find(item => item.id === product.id);
    const quantity = cartItem?.quantity || 0;

    return (
        <div className="product-card-deatils">
            <Container>
                <Row>
                    <div className="product-detail-effect">
                        <Col xl={3}>
                            <div>
                                <div className="product-badge">
                                    Premium
                                    <div className="badge-shine"></div>
                                </div>
                                <div className="product-detail-image cursor-hover">
                                    <img
                                        src={product.image || "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"}
                                        alt={product.title || "No image"}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col xl={9}>
                            <div className="product-detail-info">
                                <div className="product-brand">
                                    <strong>Brand : </strong>{product.brand || "Generic"}
                                </div>
                                <div className="product-model">
                                    <strong>Model : </strong>{product.model || "Not specified"}
                                </div>
                                <div className="product-color">
                                    <strong>Color : </strong>{product.color || "Various"}
                                </div>
                                <div className="product-category">
                                    <strong>Category : </strong>{product.category || "No category"}
                                </div>
                                <div className="product-title">
                                    <strong>Product Name : </strong>{product.title || "No title available"}
                                </div>
                                <div className="product-description">
                                    <p><strong>Description : </strong>{product.description || "No description available."}</p>
                                </div>
                                <div className="product-price">
                                    <strong>Price : </strong>
                                    {product.discount ? (
                                        <>
                                            <span className="price-original">${product.price.toFixed(2)}</span>
                                            <span className="price-discounted">
                                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                            </span>
                                            <span className="discount">({product.discount}% OFF)</span>
                                        </>
                                    ) : (
                                        <span className="price-now">${product.price.toFixed(2)}</span>
                                    )}
                                </div>
                                <div className="product-detail-meta">
                                    <div className="product-detail-rating">
                                        <strong>Ratings : </strong>
                                        <StarRating rating={ratingValue} /> {ratingValue.toFixed(1)}
                                    </div>
                                    <div className="product-detail-stock">In Stock</div>
                                </div>
                                <div className="product-detail-bottom">
                                    <div className="cart-counter cursor-hover">
                                        <button onClick={() => handleDecrease(product.id)}>-</button>
                                        <h3>{quantity}</h3>
                                        <button onClick={() => handleIncrease(product.id, product)}>+</button>
                                    </div>
                                    <button className="product-button cursor-hover" onClick={() => addToCart(product, 1)}>
                                        <span className="button-text">Add to Cart</span>
                                        <RiShoppingCartLine className="button-icon" />
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetails;
