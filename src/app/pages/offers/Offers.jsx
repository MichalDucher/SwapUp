// pages/offers/Offers.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { ITEMS_URL } from '../../data/api';
import { authorizedFetch } from '../../data/authorized-fetch'
import Navi from '../../components/Navi'
import './styles/Offers.css';

const Offers = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await authorizedFetch(ITEMS_URL);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  return (
    <Container>
      <Navi />
      <h2 className="my-4">Offers</h2>
      <Row>
        {items.map((item) => (
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
            {/* Display other item details as needed */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Offers;
