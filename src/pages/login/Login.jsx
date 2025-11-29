import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaGoogle, FaApple } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useAuth } from '../../contexts/AuthContext';
import './login.css';
import { toast } from 'react-toastify';

function Login() {
    const { emailLogin, googleLogin } = useAuth();
    const navigate = useNavigate();

    const [emailOrUser, setEmailOrUser] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailOrUser.trim()) return setError('Email is required');
        if (!password.trim()) return setError('Password is required');

        try {
            setError(null);
            setLoading(true);
            await emailLogin(emailOrUser, password);
            toast.success('Login successful');
            navigate('/profile');
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            await googleLogin();
            toast.success('Logged in with Google');
            navigate('/profile'); 
        } catch (err) {
            toast.error(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="login-wrapper">
                        <div className="text-center mb-4">
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <div className="logo cursor-hover">
                                    <span className="logo-text">TURBO SHINE</span>
                                </div>
                            </NavLink>
                        </div>

                        <div className="social-login-buttons">
                            <button className="action-btn google cursor-hover" type="button" onClick={handleGoogleLogin}>
                                <FaGoogle className="login-icon" />
                                <span>Login with Google</span>
                            </button>
                            <button className="action-btn apple cursor-hover" type="button">
                                <FaApple className="login-icon" />
                                <span>Login with iPhone</span>
                            </button>
                        </div>

                        <div className="separator"><span>or</span></div>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="usr-email" className="mb-4">
                                <Form.Label className="fw-semibold text-dark">Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><FaUser /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                        value={emailOrUser}
                                        onChange={(e) => setEmailOrUser(e.target.value)}
                                        isInvalid={!!error && error.toLowerCase().includes('email')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error && error.toLowerCase().includes('email') && error}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="usr-password" className="mb-4">
                                <Form.Label className="fw-semibold text-dark">Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!error && error.toLowerCase().includes('password')}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <VscEye /> : <VscEyeClosed />}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {error && error.toLowerCase().includes('password') && error}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                <NavLink to="/forget-password" className="link-style">Forgot your password?</NavLink>
                            </Form.Group>

                            <button className="action-btn cursor-hover" disabled={loading}>
                                <div className="btn-text">{loading ? 'Logging in...' : 'Login'}</div>
                                <FaUser className="login-icon" />
                            </button>

                            <div className="text-center mt-3">
                                <NavLink to="/signin" className="link-style cursor-hover">
                                    Don’t have an account? <strong>Sign in</strong>
                                </NavLink>
                            </div>
                        </Form>

                        {error && (
                            <Alert variant="danger" onClose={() => setError(null)} dismissible className="mt-3">
                                {error}
                            </Alert>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
