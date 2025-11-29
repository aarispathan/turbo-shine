import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import AvatarImg from '../../assets/avatar-image.png';
import { FaPencil } from 'react-icons/fa6';
import { IoExitOutline } from 'react-icons/io5';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import './userprofile.css';
import { NavLink } from 'react-router-dom';

function UserProfile() {
    const { currentUser, logout } = useAuth();

    const [showEdit, setShowEdit] = useState(false);
    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleLogout = async () => {
        await logout();
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await updateProfile(currentUser, {
                displayName: displayName.trim(),
                photoURL: photoURL.trim() || null
            });
            setSuccess('Profile updated successfully.');
            setTimeout(() => {
                setShowEdit(false);
                setSuccess('');
            }, 1000);
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row>
                <Col lg={12} md={12} sm={10} xs={12}>
                    <div className="profile-card-wrapper">
                        <div className="profile-card">
                            <div className="card-content">
                                <div className="avatar-wrapper">
                                    <div className="avatar">
                                        <div className="avatar-glow" />
                                        <img
                                            src={currentUser?.photoURL || AvatarImg}
                                            alt={(currentUser?.displayName || 'User') + ' avatar'}
                                        />
                                        <div className="avatar-border" />
                                    </div>
                                </div>

                                <div className="profile-info">
                                    <h2 className="name"><strong>Your Name:</strong> {currentUser?.displayName || 'Anonymous'}</h2>
                                    <p className="title"><strong>Your Email:</strong> {currentUser?.email || 'No email'}</p>
                                    <NavLink to='/forget-password'>
                                        <button className="forget-button">
                                            Forgot Your Password?
                                        </button>
                                    </NavLink>
                                </div>


                                <div className="avatar-btn">
                                    <button className="action-btn" onClick={() => setShowEdit(true)}>
                                        <span className="btn-text">Edit Profile</span>
                                        <FaPencil className="button-icon" />
                                    </button>
                                    <button className="action-btn" onClick={handleLogout}>
                                        <span className="btn-text">Log Out</span>
                                        <IoExitOutline className="button-icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal for editing profile */}
                    <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleUpdateProfile}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Display Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Photo URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                    />
                                </Form.Group>
                                {error && <div className="text-danger mb-2">{error}</div>}
                                {success && <div className="text-success mb-2">{success}</div>}
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Save Changes'}
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </Container >
    );
}

export default UserProfile;
