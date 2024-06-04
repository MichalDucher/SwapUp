import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import { ITEMS_URL, CATEGORIES_URL } from '../../data/api';
import { authorizedFetch } from '../../data/authorized-fetch';
import Navi from '../../components/Navi';
import './styles/AddOffer.css';

const AddOffer = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await authorizedFetch(CATEGORIES_URL);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const categoryId = formData.category;
    const category = categories.find(cat => cat.id === categoryId);
    const productOwnerId = sessionStorage.getItem('id');

    if (!categoryId || !productOwnerId || !category) {
      console.error('Category ID, Category, or Product Owner ID is missing.');
      alert('Please select a category and make sure you are logged in.');
      return;
    }

    // Convert image to base64
    const convertImageToBase64 = (imageFile) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    };

    try {
      let base64Image = null;
      if (formData.image) {
        base64Image = await convertImageToBase64(formData.image);
      }

      const payload = {
        id: "", // You might need to set this or let the server handle it
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: {
          id: category.id,
          name: category.name,
        },
        image: base64Image,
        ownerId: productOwnerId,
      };

      const url = `${ITEMS_URL}/${categoryId}/${productOwnerId}`;
      console.log('Sending data to URL:', url);
      console.log('Payload:', payload);

      const response = await authorizedFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Offer added successfully!');
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to add offer: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding offer:', error);
      alert('An error occurred while adding the offer');
    }
  };

  return (
    <Container className="add-offer-container">
      <Navi />
      <h2>Add New Offer</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDescription">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPrice">
          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCategory">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formImage">
          <Form.Label column sm="2">
            Image
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              name="image"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Offer
        </Button>
      </Form>
    </Container>
  );
};

export default AddOffer;
