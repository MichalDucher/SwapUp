// src/pages/profile/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import Navi from '../../components/Navi';
import './styles/Profile.css';

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('danger');
      return;
    }
    // Logic to update password
    // Example: await updateUserPassword(newPassword);
    setMessage('Password updated successfully');
    setMessageType('success');
  };

  return (
    <Container className="profile-container">
        <Navi />
      <h2>User Profile</h2>
      {message && <Alert variant={messageType}>{message}</Alert>}
      <Form>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={email} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextUsername">
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={username} />
          </Col>
        </Form.Group>
      </Form>
      <Form onSubmit={handlePasswordChange}>
        <Form.Group controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
