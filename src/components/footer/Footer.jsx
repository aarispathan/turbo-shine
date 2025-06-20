import React from 'react'
import "./footer.css"
import { Container, Row } from 'react-bootstrap'
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

function Footer() {
    return (
        <div>
            <footer className="footer-section">

                <Container className="container">
                    <Row className="row">
                        <div className="footer-col">
                            <h4>company</h4>
                            <ul>
                                <li className="cursor-hover" ><a href="#">about us</a></li>
                                <li className="cursor-hover" ><a href="#">our services</a></li>
                                <li className="cursor-hover" ><a href="#">privacy policy</a></li>
                                <li className="cursor-hover" ><a href="#">affiliate program</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>get help</h4>
                            <ul>
                                <li className="cursor-hover"><a href="#">FAQ</a></li>
                                <li className="cursor-hover"><a href="#">shipping</a></li>
                                <li className="cursor-hover"><a href="#">returns</a></li>
                                <li className="cursor-hover"><a href="#">order status</a></li>
                                <li className="cursor-hover"><a href="#">payment options</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>online shop</h4>
                            <ul>
                                <li className="cursor-hover"><a href="#">watch</a></li>
                                <li className="cursor-hover"><a href="#">bag</a></li>
                                <li className="cursor-hover"><a href="#">shoes</a></li>
                                <li className="cursor-hover"><a href="#">dress</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>follow us</h4>
                            <div className="social-links">
                                <ul className="wrapper">
                                    <li className="icon facebook">
                                        <a href="#" className="cursor-hover" aria-label="Facebook">
                                            <span className="tooltip">Facebook</span>
                                            <FaFacebookF />
                                        </a>
                                    </li>
                                    <li className="icon twitter">
                                        <a href="#" className="cursor-hover" aria-label="Twitter">
                                            <span className="tooltip">Twitter</span>
                                            <FaXTwitter />
                                        </a>
                                    </li>
                                    <li className="icon instagram">
                                        <a href="#" className="cursor-hover" aria-label="Instagram">
                                            <span className="tooltip">Instagram</span>
                                            <FaInstagram />
                                        </a>
                                    </li>
                                    <li className="icon linkedin">
                                        <a href="#" className="cursor-hover" aria-label="LinkedIn">
                                            <span className="tooltip">Linkedin</span>
                                            <FaLinkedinIn />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Row>
                </Container>
            </footer>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} TURBO SHINE BY AK. All RIGHT RESERVED</p>
            </div>
        </div >
    )
}

export default Footer
