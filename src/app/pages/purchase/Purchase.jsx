import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Navi from '../../components/Navi';
import './styles/Purchase.css';

const Purchase = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    creditCardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz dodać logikę do przetwarzania danych zakupu
    console.log('Form data:', formData);
  };

  return (
    <Container>
      <Navi />
      <h2 className="my-4">Purchase</h2>
      <Form className="purchase-form" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </Form.Group>
        </Row>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" value={formData.city} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group as={Col} controlId="zipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
          </Form.Group>
        </Row>

        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" name="country" value={formData.country} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="creditCardNumber" className="mb-3">
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleInputChange} required />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group as={Col} controlId="cvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Purchase;
