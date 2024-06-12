import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Alert } from 'react-bootstrap';
import { authorizedFetch } from '../../data/authorized-fetch';
import { useAuth } from '../../../context/AuthContext';
import { ITEMS_URL, TRANSACTION_URL } from '../../data/api';

const Purchase = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await authorizedFetch(`${ITEMS_URL}/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleConfirmPurchase = async () => {
    const payload = {
      id: Math.random().toString(36).substring(2),
      buyerId: sessionStorage.getItem("id"),
      sellerId: item.ownerId,
      productsId: [item.id],
      totalPrice: item.price,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await authorizedFetch(`${TRANSACTION_URL}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (response.ok) {

        const deleteResponse = await authorizedFetch(`${ITEMS_URL}/${id}`, {
          method: 'DELETE',
        });
  
        if (deleteResponse.ok) {
          setMessage({ text: 'Purchase successful and item deleted!', type: 'success' });
          setTimeout(() => {
            navigate('/offers');
          }, 3000);
        } else {
          const deleteErrorText = await deleteResponse.text();
          throw new Error(deleteErrorText);
        }

        setMessage({ text: 'Purchase successful!', type: 'success' });
        setTimeout(() => {
          navigate('/offers');
        }, 3000);
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error('Error confirming purchase:', error);
      setMessage({ text: 'Failed to complete purchase.', type: 'danger' });
    }
  };

  const handleDeclinePurchase = () => {
    navigate('/offers');
  };

  if (!item) return <div>Loading...</div>;

  return (
    <Container>
      <h2>Purchase {item.name}</h2>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      <p><strong>Category:</strong> {item.category.name}</p>
      <Button variant="primary" onClick={handleConfirmPurchase}>
        Confirm Purchase
      </Button>
      <Button variant="danger" onClick={handleDeclinePurchase} className="ml-2">
        Decline
      </Button>
    </Container>
  );
};

export default Purchase;
