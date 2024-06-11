import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navi from '../../components/Navi';
import { authorizedFetch } from '../../data/authorized-fetch';
import { AUTH_URL, ITEMS_URL } from '../../data/api';
import './styles/Profile.css';

const Profile = () => {
  const { logout } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [userProducts, setUserProducts] = useState([]);
  const navigate = useNavigate();

  const email = sessionStorage.getItem('username');

  useEffect(() => {
    fetchUserProducts(); // Fetch user's products on component mount
  }, []);

  const fetchUserProducts = async () => {
    const productOwnerId = sessionStorage.getItem('id');
    try {
      const response = await authorizedFetch(`${ITEMS_URL}/user/${productOwnerId}`);
      if (response.ok) {
        const data = await response.json();
        setUserProducts(data);
      } else {
        throw new Error('Failed to fetch user products');
      }
    } catch (error) {
      console.error('Error fetching user products:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('danger');
      return;
    }

    const payload = {
      email: sessionStorage.getItem('username'),
      oldPassword: sessionStorage.getItem('password'),
      newPassword: newPassword,
    };

    try {
      const response = await authorizedFetch(`${AUTH_URL}/change-password`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('Password updated successfully');
        setMessageType('success');
        sessionStorage.setItem('password', newPassword); // Update sessionStorage with the new password
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Failed to update password');
      setMessageType('danger');
    }
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;

    try {
      const response = await authorizedFetch(`${ITEMS_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Offer deleted successfully');
        setMessageType('success');
        fetchUserProducts(); // Refresh user's products list
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      setMessage('Failed to delete offer');
      setMessageType('danger');
    }
  };

  return (
    <Container className="profile-container">
      <Navi />
      <div className="profile-credentials">
        <h2>User Profile</h2>
        {message && <Alert variant={messageType}>{message}</Alert>}
        <Form onSubmit={handlePasswordChange}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              plaintext
              readOnly
              defaultValue={email}
            />
          </Form.Group>
          <Form.Group controlId="formOldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter old password"
              required
              autoComplete="current-password"
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </Form>
        <div className="button-group">
          <Button
            variant="secondary"
            onClick={() => navigate('/add-offer')}
          >
            Add Offer
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/transaction-history')}
          >
            Transaction History
          </Button>
        </div>
      </div>
      <div className="profile-products">
        <h3 className="mt-4">Your Products</h3>
        {userProducts.length > 0 ? (
          <div className="products-grid">
            {userProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <h4>{product.name}</h4>
                <img src={product.image} alt={product.name} className="product-image" />
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
                <p>Category: {product.category.name}</p>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteOffer(product.id)}
                >
                  Delete Offer
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </Container>
  );
};

export default Profile;
