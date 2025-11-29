import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa6';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import TsLogo from '../../assets/TS_LOGO.png';
import './header.css';
import { Col, Container, Row } from 'react-bootstrap';

function Header() {
    const { cartItems } = useCart();
    const { currentUser } = useAuth();
    const isLoggedIn = !!currentUser;
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(e) {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <Container>
            <Row>
                <Col>
                    <div className="header-section">
                        <nav className="navbar" ref={navRef}>
                            <div className="nav-brand ">
                                <NavLink to="/">
                                    <div className="logo cursor-hover">
                                        <img style={{ width: "90px" }} src={TsLogo} alt="" />
                                    </div>
                                </NavLink>
                            </div>
                            <div id="nav-links" className={`nav-links ${isOpen ? 'active' : ''}`}>
                                <NavLink to="/" className="nav-link cursor-hover" onClick={() => { setIsOpen(false); }}>
                                    <span>Home</span>
                                    <div className="link-effect"></div>
                                </NavLink>
                                <NavLink to="/products" className="nav-link cursor-hover" onClick={() => { setIsOpen(false); }}>
                                    <span>Products</span>
                                    <div className="link-effect"></div>
                                </NavLink>
                                <NavLink to="/contact" className="nav-link cursor-hover" onClick={() => { setIsOpen(false); }}>
                                    <span>Contact</span>
                                    <div className="link-effect"></div>
                                </NavLink>
                                <NavLink
                                    to="/cart"
                                    className="nav-link cursor-hover"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <span>
                                        <RiShoppingCartLine className="shoping-cart" />
                                    </span>
                                    <div className="link-effect"></div>
                                    {cartItems.reduce((total, item) => total + item.quantity, 0) > 0 && (
                                        <span className="cart-count">
                                            {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                        </span>
                                    )}
                                </NavLink>

                                {!isLoggedIn ? (
                                    <>
                                        <NavLink to="/signin" className="login-signin-btn cursor-hover">
                                            <button className="action-btn">
                                                <div className="btn-text">Sign in</div>
                                                <FaUser className="login-icon" />
                                            </button>
                                        </NavLink>
                                        <NavLink to="/login" className="login-signin-btn cursor-hover">
                                            <button className="action-btn">
                                                <div className="btn-text">Login</div>
                                                <FaUser className="login-icon" />
                                            </button>
                                        </NavLink>
                                    </>
                                ) : (
                                    <NavLink to="/profile" className="login-signin-btn cursor-hover">
                                        <button className="action-btn">
                                            <div className="btn-text">Profile</div>
                                            <FaUser className="login-icon" />
                                        </button>
                                    </NavLink>
                                )}

                            </div>
                            <button
                                id="hamburger"
                                className={`hamburger ${isOpen ? 'is-active' : ''} link`}
                                onClick={() => { toggleMenu(); }}
                                aria-label="Toggle menu"
                                aria-expanded={isOpen}
                                aria-controls="nav-links"
                            >
                                <span className="line"></span>
                                <span className="line"></span>
                                <span className="line"></span>
                            </button>
                        </nav>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
