import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaGoogle, FaApple } from 'react-icons/fa';
import { RiLockPasswordFill, RiMailLine } from 'react-icons/ri';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import './signin.css';

function SignIn() {
    const { emailSignup, googleLogin } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // basic client validation
        if (!username.trim()) return setError('Username is required');
        if (!email.trim()) return setError('Email is required');
        if (!/\S+@\S+\.\S+/.test(email)) return setError('Invalid email format');
        if (!password.trim()) return setError('Password is required');
        if (password !== confirmPassword) return setError('Passwords do not match');

        try {
            setError(null);
            setSuccess(null);
            setLoading(true);

            const cred = await emailSignup(email, password);
            await updateProfile(cred.user, { displayName: username });

            setSuccess('Account created! Redirecting to login…');
            setTimeout(() => navigate('/login', { replace: true }), 2000);
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="signin-wrapper">
                        <div className="text-center mb-4">
                            <NavLink to="/" style={{ textDecoration: 'none' }}>
                                <div className="logo cursor-hover">
                                    <span className="logo-text">TURBO SHINE</span>
                                </div>
                            </NavLink>
                        </div>

                        <div className="social-login-buttons">
                            <button className="action-btn google cursor-hover" type="button" onClick={googleLogin}>
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
                            <Form.Group controlId="usr-name" className="mb-4">
                                <Form.Label className="fw-semibold text-dark">Your Name</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><FaUser /></InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        isInvalid={!!error && error.toLowerCase().includes('username')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error && error.toLowerCase().includes('username') && error}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="usr-email" className="mb-4">
                                <Form.Label className="fw-semibold text-dark">Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><RiMailLine /></InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!error && error.toLowerCase().includes('email')}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error && error.toLowerCase().includes('email') && error}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="usr-password" className="mb-4">
                                <Form.Label className="fw-semibold text-dark">Create Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={!!error && error.toLowerCase().includes('password')}
                                    />
                                    <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                                        {showPassword ? <VscEye /> : <VscEyeClosed />}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {error && error.toLowerCase().includes('password') && error}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="usr-confirm-password" className="mb-4">
                                <Form.Label className="fw-semibold text-dark">Confirm Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
                                    <Form.Control
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        isInvalid={!!error && error.toLowerCase().includes('match')}
                                    />
                                    <Button variant="outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                                        {showConfirmPassword ? <VscEye /> : <VscEyeClosed />}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {error && error.toLowerCase().includes('match') && error}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <button type="submit" className="action-btn cursor-hover" disabled={loading}>
                                <div className="btn-text">{loading ? "Signing up..." : "Sign Up"}</div>
                                <FaUser className="login-icon" />
                            </button>

                            <div className="text-center mt-3">
                                <NavLink to="/login" className="link-style cursor-hover">
                                    Already have an account? <strong>Log in</strong>
                                </NavLink>
                            </div>
                        </Form>

                        {error && (
                            <Alert variant="danger" onClose={() => setError(null)} dismissible className="mt-3">
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert variant="success" onClose={() => setError(null)} dismissible className="mt-3">
                                {success}
                            </Alert>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SignIn;
