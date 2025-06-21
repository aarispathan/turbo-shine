import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './checkout.css';
import {
    FaEdit, FaTrash,
    FaUser, FaEnvelope, FaUniversity,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { RiShoppingCartLine } from 'react-icons/ri';
import { IoLocationSharp } from "react-icons/io5";
import { useCart } from '../../contexts/CartContext';
import { useNavigate, NavLink } from 'react-router-dom';

const Checkout = () => {
    const {
        cartItems,
        formData,
        setFormData,
        selectedAddressId,
        setSelectedAddressId,
        savedAddresses,
        handleSaveAddress,
        handleEditAddress,
        handleDeleteAddress
    } = useCart();

    const isFormValid = () => {
        const { fullName, email, address, city, state, zip } = formData;
        return fullName && email && address && city && state && zip;
    };

    // useNavigate hook
    const navigate = useNavigate();

    const handleProceed = (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            toast.error("Please fill in all required fields!");
            return;
        }
        navigate('/payment-integration');
    };
    return (
        <div className="checkout-section">
            <Container>
                <Row className="checkout-layout">
                    <Col lg={9} md={12} className="billing-col">
                        <div className="form-container">
                            <form>
                                <Row>
                                    <Col md={12}>
                                        <h3>Billing Address</h3>

                                        <label htmlFor="fullName"><FaUser /> Full Name</label>
                                        <input type="text" id="fullName" name="fullName"
                                            placeholder="John M. Doe" value={formData.fullName}
                                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                            autoComplete='name' />

                                        <label htmlFor="email"><FaEnvelope /> Email</label>
                                        <input type="text" id="email" name="email"
                                            placeholder="john@example.com" value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            autoComplete='email' />

                                        <label htmlFor="address"><IoLocationSharp /> Address</label>
                                        <input type="text" id="address" name="address"
                                            placeholder="Street address" value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            autoComplete='address-line1' />

                                        <label htmlFor="city"><FaUniversity /> City</label>
                                        <input type="text" id="city" name="city"
                                            placeholder="City" value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            autoComplete='address-level2' />

                                        <div className='card-detail'>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <label htmlFor="state">State</label>
                                                    <input type="text" id="state" name="state"
                                                        placeholder="State" value={formData.state}
                                                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                                                        autoComplete='address-level1' />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <label htmlFor="zip">Zip</label>
                                                    <input type="text" id="zip" name="zip"
                                                        placeholder="ZIP Code" value={formData.zip}
                                                        onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                                        autoComplete='postal-code' />
                                                </Col>
                                            </Row>

                                            <button
                                                type="button"
                                                className="action-btn cursor-hover w-100 mt-3 py-2"
                                                onClick={handleSaveAddress}
                                            >
                                                <span className="button-text">Save Address</span>
                                                <RiShoppingCartLine className="login-icon" />
                                            </button>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className="savedaddress mt-4">
                                            <h5>Saved Addresses</h5>
                                            {savedAddresses.length === 0 ? (
                                                <p>No saved addresses yet. Fill the form and click "Save Address" to create one.</p>
                                            ) : (
                                                savedAddresses.map((addr) => (
                                                    <div className="form-check mt-2 d-flex justify-content-between align-items-center" key={addr.id}>
                                                        <div>
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="savedAddress"
                                                                id={addr.id}
                                                                value={addr.id}
                                                                checked={selectedAddressId === addr.id}
                                                                onChange={() => setSelectedAddressId(addr.id)}
                                                            />
                                                            <label className="form-check-label ms-2" htmlFor={addr.id}>
                                                                {addr.fullName}, {addr.address}, {addr.city}, {addr.state} {addr.zip}
                                                            </label>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <FaEdit
                                                                className="text-primary cursor-pointer"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => handleEditAddress(addr.id)}
                                                            />
                                                            <FaTrash
                                                                className="text-danger cursor-pointer"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => handleDeleteAddress(addr.id)}
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            )}

                                        </div></Col>
                                </Row>
                                <div className="form-check mt-3">
                                    <input type="checkbox" className="form-check-input" id="sameAddress" name="sameAddress" defaultChecked />
                                    <label className="form-check-label" htmlFor="sameAddress">
                                        Shipping address same as billing
                                    </label>
                                </div>
                                <button
                                    className="action-btn cursor-hover w-100 mt-3 py-2"
                                    onClick={handleProceed}
                                    type="button"
                                >
                                    <span className="button-text">Proceed to Checkout</span>
                                    <RiShoppingCartLine className="login-icon" />
                                </button>


                            </form>
                        </div>
                    </Col>

                    <Col lg={3} md={12} className="cart-col">
                        <div className="form-container">
                            <h4>
                                Cart <span className="price">
                                    <RiShoppingCartLine /> <b>{cartItems.length}</b>
                                </span>
                            </h4>
                            {cartItems.map((item, idx) => (
                                <div key={item.id} className="cart-item-summary">
                                    <img src={item.image} alt={item.title} className="cart-item-image" />
                                    <div className="cart-item-info">
                                        <div className="cart-item-title">
                                            {idx + 1}. {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
                                        </div>
                                        <div className="price">
                                            ${((item.price ?? 0) * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <hr />
                            <p>
                                Total
                                <span className="price">
                                    <b>
                                        ${cartItems.reduce((acc, item) => {
                                            const price = item.price ?? 0;
                                            const discount = item.discount ?? 0;
                                            const discountedPrice = price * (1 - discount / 100);
                                            return acc + discountedPrice * item.quantity;
                                        }, 0).toFixed(2)}
                                    </b>
                                </span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Checkout;
