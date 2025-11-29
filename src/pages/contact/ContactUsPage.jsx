import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaTelegramPlane } from "react-icons/fa";
import './contactus.css';

function ContactUsPage() {
    return (
        <div className="contact-section">
            <Container>
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <div className="contact-box">
                            <h2>Contact Us</h2>
                            <p>We’d love to hear from you. Please fill out the form below.</p>
                            <Form>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your Name" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Your Email" required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="subject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Subject" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="message">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={5} placeholder="Write your message..." required />
                                </Form.Group>

                                <button className="action-btn cursor-hover w-100 mt-3 py-2">
                                    <span className="button-text">Send Message</span>
                                    <FaTelegramPlane className="contact-icon" />
                                </button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ContactUsPage;
