import React, { useState } from 'react';
import {
    Container, Row, Col, Form, InputGroup, Button, Spinner,
} from 'react-bootstrap';
import { IoLockClosedOutline } from 'react-icons/io5';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { RiLockPasswordFill } from 'react-icons/ri';
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import TSLOGO from '../../assets/TS_LOGO.png';
import './forgetpassword.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgetPassword() {
    const { currentUser, auth: fbAuth } = useAuth();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPw] = useState(false);
    const [showConfirm, setShowCpw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const passwordsMatch = () => {
        if (password !== confirmPassword) {
            setError('Passwords don’t match');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (currentUser) {
                // User is logged in, update password
                if (!passwordsMatch()) return;

                await updatePassword(currentUser, password);
                toast.success('Password updated successfully!');
                navigate('/profile');
            } else {
                if (!email.trim()) {
                    setError('Please enter your email.');
                    return;
                }

                await sendPasswordResetEmail(fbAuth, email.trim());
                toast.success('Reset link sent! Check your inbox.');
                navigate('/login');
            }
        } catch (err) {
            if (err.code === 'auth/requires-recent-login') {
                setError('Please log in again before changing your password.');
            } else {
                setError(err.message || 'Operation failed.');
            }
        } finally {
            setLoading(false);
        }
    };


    const loggedIn = !!currentUser;

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <div className="forget-password-section">
                        <div className="fp-cardStyle">
                            <form onSubmit={handleSubmit} noValidate>
                                <img src={TSLOGO} alt="Turbo‑Shine logo" className="fp-signupLogo" />
                                <h2 className="fp-formTitle">
                                    {loggedIn ? 'Change your password' : 'Forgot password?'}
                                </h2>

                                {loggedIn ? (
                                    <>
                                        {/* ------- create pw -------- */}
                                        <Form.Group controlId="new-pw" className="mb-4">
                                            <Form.Label className="fw-semibold text-dark">Create Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
                                                <Form.Control
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                    isInvalid={!!error && error.toLowerCase().includes('password')}
                                                />
                                                <Button
                                                    variant="link"
                                                    className="show-password"
                                                    onClick={() => setShowPw(!showPassword)}
                                                    tabIndex={-1}
                                                >
                                                    {showPassword ? <VscEye /> : <VscEyeClosed />}
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>

                                        {/* ------- confirm pw ------- */}
                                        <Form.Group controlId="confirm-pw" className="mb-4">
                                            <Form.Label className="fw-semibold text-dark">Confirm Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text><RiLockPasswordFill /></InputGroup.Text>
                                                <Form.Control
                                                    type={showConfirm ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                    isInvalid={!!error && error.toLowerCase().includes('match')}
                                                />
                                                <Button
                                                    variant="link"
                                                    className="show-password"
                                                    onClick={() => setShowCpw(!showConfirm)}
                                                    tabIndex={-1}
                                                >
                                                    {showConfirm ? <VscEye /> : <VscEyeClosed />}
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </>
                                ) : (
                                    /* ------- e‑mail input (not logged in) ------- */
                                    <Form.Group controlId="reset-email" className="mb-4">
                                        <Form.Label className="fw-semibold text-dark">Your e‑mail</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type="email"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                isInvalid={!!error && error.toLowerCase().includes('e‑mail')}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                )}

                                {/* ---------- errors ---------- */}
                                {error && <p className="fp-errorText" role="alert">{error}</p>}

                                {/* ---------- submit btn ---------- */}
                                <div className="fp-buttonWrapper">
                                    <button type="submit" className="action-btn" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <Spinner animation="border" size="sm" /> Processing…
                                            </>
                                        ) : (
                                            <>
                                                {loggedIn ? 'Update password' : 'Send reset link'}
                                                <IoLockClosedOutline className="button-icon" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgetPassword;
