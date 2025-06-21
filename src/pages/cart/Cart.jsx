import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { RiDeleteBinFill, RiShoppingCartLine } from 'react-icons/ri';
import { Col, Container, Row } from 'react-bootstrap';
import './cart.css';
import { NavLink } from 'react-router-dom';

function Cart() {
    const { cartItems, handleDelete, handleIncrease, handleDecrease } = useCart();

    const safeToFixed = (num, decimals = 2) => {
        return typeof num === 'number' ? num.toFixed(decimals) : '0.00';
    };

    return (
        <div className="cart-section">
            <Container>
                <Row>
                    <Col>
                        <h1 className="cart-heading">Your Cart</h1>
                        {cartItems.length === 0 ? (
                            <p className="empty-message">
                                <RiShoppingCartLine className="empty-message-icon" /> Add Some Products, Your cart is empty.
                            </p>
                        ) : (
                            <div className="cart-items">
                                {cartItems.map((item) => {
                                    const price = item.price ?? 0;
                                    const discount = item.discount ?? 0;
                                    const discountedPrice = price * (1 - discount / 100);

                                    return (
                                        <div key={item.id} className="cart-item">
                                            <img src={item.image} alt={item.title} className="cart-item-image cursor-hover" />

                                            <div className="cart-item-content">
                                                <div className="cart-item-details">
                                                    <h3>{item.title}</h3>
                                                    <div className="product-price">
                                                        <strong>Price : </strong>
                                                        {discount ? (
                                                            <>
                                                                <span className="price-original">${safeToFixed(price)}</span>
                                                                <span className="price-discounted">${safeToFixed(discountedPrice)}</span>
                                                                <br />
                                                                <span className="discount">({discount}% OFF)</span>
                                                            </>
                                                        ) : (
                                                            <span className="price-now">${safeToFixed(price)}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="cart-bottom-section">
                                                    <div className="cart-counter cursor-hover">
                                                        <button onClick={() => handleDecrease(item.id)}>-</button>
                                                        <h3>{item.quantity}</h3>
                                                        <button onClick={() => handleIncrease(item.id)}>+</button>
                                                    </div>
                                                    <div className="cart-bottom">
                                                        <div>
                                                            {discount ? (
                                                                <>
                                                                    <div>
                                                                        <strong>Qty : </strong> {item.quantity} × ${safeToFixed(discountedPrice)}
                                                                    </div>
                                                                    <div>
                                                                        <strong>Original Price : </strong>{' '}
                                                                        <span className="price-original">${safeToFixed(price * item.quantity)}</span>
                                                                    </div>
                                                                    <div>
                                                                        <strong>Discounted Price : </strong>{' '}
                                                                        <span className="price-discounted">${safeToFixed(discountedPrice * item.quantity)}</span>
                                                                    </div>
                                                                    <div className="price-saved">
                                                                        You saved ${safeToFixed((price - discountedPrice) * item.quantity)}!
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div>
                                                                    <div><strong>Qty : </strong>{item.quantity} × ${safeToFixed(price)}</div>
                                                                    <strong>Total:</strong> ${safeToFixed(price * item.quantity)}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <button onClick={() => handleDelete(item.id)} className="product-button cursor-hover">
                                                            <span className="button-text">Remove</span>
                                                            <RiDeleteBinFill className="button-icon" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}

                                <div className="cart-total-summary row">
                                    <div className="col-md-6 summary-left">
                                        <h2>Cart Total</h2>
                                        <div><strong>Total Items :</strong> {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</div>
                                        <div>
                                            <strong>Subtotal :</strong> $
                                            {safeToFixed(cartItems.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0))}
                                        </div>
                                        <div className="you-save">
                                            You saved $
                                            {safeToFixed(cartItems.reduce((acc, item) => {
                                                const price = item.price ?? 0;
                                                const discount = item.discount ?? 0;
                                                const discountedPrice = price * (1 - discount / 100);
                                                return acc + (price - discountedPrice) * item.quantity;
                                            }, 0))} on this order.
                                        </div>
                                        <div className='discounted-total'>
                                            <strong>Discounted Total :</strong> $
                                            {safeToFixed(cartItems.reduce((acc, item) => {
                                                const price = item.price ?? 0;
                                                const discount = item.discount ?? 0;
                                                const discountedPrice = price * (1 - discount / 100);
                                                return acc + discountedPrice * item.quantity;
                                            }, 0))}
                                        </div>
                                    </div>
                                    <div className="col-md-6 summary-right">
                                        <div className="product-summary">
                                            <strong>Items :</strong>
                                            <div>
                                                {cartItems.map((item) => (
                                                    <div key={item.id}>
                                                        {item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <NavLink to="/checkout" style={{ textDecoration: 'none' }}>
                                            <button className="action-btn cursor-hover">
                                                <span className="button-text">Proceed to Checkout</span>
                                                <RiShoppingCartLine className="login-icon" />
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Cart;
