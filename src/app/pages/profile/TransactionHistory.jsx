import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TRANSACTION_URL } from '../../data/api';
import { authorizedFetch } from '../../data/authorized-fetch';
import Navi from '../../components/Navi';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await authorizedFetch(`${TRANSACTION_URL}/user/${sessionStorage.getItem("id")}`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        throw new Error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <Container>
        <Navi />
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Total Price: {transaction.totalPrice}</p>
            <p>Transaction Date: {new Date(transaction.createdAt).toLocaleString()}</p>
            {transaction.buyerId === sessionStorage.getItem('id') ? (
              <p>Transaction Type: Purchase</p>
            ) : (
              <p>Transaction Type: Sale</p>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TransactionHistory;
