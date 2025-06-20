import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCcVisa, FaCcAmex, FaCcMastercard, FaCcDiscover } from 'react-icons/fa';
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'react-toastify';
import './payment.css';

function Payment() {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toast.success("Your order will be placed soon!", {
            position: "bottom-center",
            autoClose: 3000,
        });

        clearCart();

        setTimeout(() => {
            navigate('/');
        }, 3000);
    };


    return (
        <div className="payment-section">
            <Container>
                <Row>
                    <Col md={12}>
                        <div className="payment-box">
                            <h3>Payment</h3>
                            <p>Cards Accepted</p>
                            <div className="icon-container mb-3">
                                <FaCcVisa style={{ color: 'navy', fontSize: '2rem', marginRight: '10px' }} />
                                <FaCcAmex style={{ color: 'blue', fontSize: '2rem', marginRight: '10px' }} />
                                <FaCcMastercard style={{ color: 'red', fontSize: '2rem', marginRight: '10px' }} />
                                <FaCcDiscover style={{ color: 'orange', fontSize: '2rem' }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardName">Name on Card</label>
                                <input
                                    type="text"
                                    id="cardName"
                                    name="cardName"
                                    placeholder="Name on card"
                                    autoComplete="cc-name"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardNumber">Credit Card Number</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    placeholder="1111-2222-3333-4444"
                                    autoComplete="cc-number"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expMonth">Exp Month</label>
                                <input
                                    type="text"
                                    id="expMonth"
                                    name="expMonth"
                                    placeholder="September"
                                    autoComplete="cc-exp-month"
                                    className="form-control"
                                />
                            </div>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <label htmlFor="expYear">Exp Year</label>
                                    <input
                                        type="text"
                                        id="expYear"
                                        name="expYear"
                                        placeholder="2025"
                                        autoComplete="cc-exp-year"
                                        className="form-control"
                                    />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        name="cvv"
                                        placeholder="352"
                                        autoComplete="cc-csc"
                                        className="form-control"
                                    />
                                </Col>
                                <button className="action-btn cursor-hover w-100 mt-3 py-2" onClick={handleCheckout}>
                                    <span className="button-text">Proceed to Checkout</span>
                                    <AiOutlineCheck className="check-icon" />
                                </button>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Payment;
