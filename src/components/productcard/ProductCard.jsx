import React, { useMemo } from "react";
import "./productcard.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom"

const fallbackImage = "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";

export const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) stars.push(<FaStar key={i} color="#ffc107" />);
        else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} color="#ffc107" />);
        else stars.push(<FaRegStar key={i} color="#ffc107" />);
    }
    return <div className="product-rating-stars">{stars}</div>;
};

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const baseImageUrl = "https://fakestoreapi.in/images/";

    const imageUrl = product.image
        ? product.image.startsWith("http")
            ? product.image
            : `${baseImageUrl}${product.image}`
        : fallbackImage;


    const ratingValue = useMemo(() => {
        return product.rating && typeof product.rating.rate === "number"
            ? product.rating.rate
            : parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
    }, [product.rating]);

    return (
        <div className="product-card">
            <div className="product-badge">Premium<div className="badge-shine"></div></div>
            <div className="product-image-link" style={{ display: 'block' }}>
                <Link to={`/product-details/${product.id}`} >
                    <div className="product-image cursor-hover">
                        <img
                            src={imageUrl}
                            alt={product.title}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackImage;
                            }}
                        />
                    </div>
                </Link>
            </div>
            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <div style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Link to={`/product-details/${product.id}`} style={{ textDecoration: 'none' }} >
                        <h2 className="product-title">{product.title}</h2>
                    </Link>
                </div>
                <div className="product-description"><p>{product.description}</p></div>
                <div className="product-features">
                    <span className="feature">6 Month Warranty</span>
                    <span className="feature">Best Deal</span>
                </div>
                <div className="product-bottom">
                    <div className="product-price">
                        <strong>Price : </strong>
                        {product.discount ? (
                            <>
                                <span className="price-original">${product.price.toFixed(2)}</span>
                                <span className="price-discounted">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                                <br />
                                <span className="discount">({product.discount}% OFF)</span>
                            </>
                        ) : (
                            <span className="price-now">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    <button
                        type="button"
                        className="product-button cursor-hover"
                        onClick={() => {
                            addToCart(product);
                        }}
                    >
                        <span className="button-text">Add to Cart</span>
                        <RiShoppingCartLine className="button-icon" />
                    </button>
                </div>

                <div className="product-meta">
                    <div className="product-rating">
                        Ratings: <StarRating rating={ratingValue} /> {ratingValue.toFixed(1)}
                    </div>
                    <div className="product-stock">In Stock</div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
