import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { ITEMS_URL, CATEGORIES_URL } from '../../data/api';
import Navi from '../../components/Navi';
import { useAuth } from '../../../context/AuthContext';
import './styles/Offers.css';

const Offers = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, setLastSelectedItem } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(ITEMS_URL);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIES_URL);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const handlePurchase = () => {
    if (isAuthenticated) {
      navigate(`/purchase/${selectedItem.id}`);
    } else {
      setLastSelectedItem(selectedItem);
      navigate('/login');
    }
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item => {
    if (filterCategory && item.category.name !== filterCategory) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Container>
      <Navi />
      <h2 className="my-4">Offers</h2>
      <Form className="mb-3">
        <Form.Group controlId="formFilterCategory">
          <Form.Label>Filter by Category:</Form.Label>
          <Form.Control as="select" onChange={handleFilterChange}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formSearch">
          <Form.Label>Search by Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter search term" onChange={handleSearchChange} />
        </Form.Group>
      </Form>
      <Row>
        {filteredItems.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: ${item.price}</Card.Text>
                <Card.Text>Category: {item.category.name}</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(item)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedItem && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Price:</strong> ${selectedItem.price}</p>
            <p><strong>Category:</strong> {selectedItem.category.name}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePurchase}>
              {isAuthenticated ? 'Purchase' : 'Login to Purchase'}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Offers;
