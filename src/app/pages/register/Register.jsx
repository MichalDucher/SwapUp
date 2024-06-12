import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { REGISTER_URL } from '../../data/api';
import { useNavigate } from 'react-router-dom';
import Navi from '../../components/Navi';
import './Register.css';

async function registerUser(credentials) {
  return fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Register({ setToken }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // Se la registrazione ha avuto successo
    if (response.token) {
      setToken(response.token); // Imposta il token nello stato dell'applicazione
      sessionStorage.setItem('username', email); // Memorizza l'email nella sessionStorage
      sessionStorage.setItem('password', password); // Memorizza la password nella sessionStorage
      navigate('/'); // Reindirizza l'utente alla homepage dopo la registrazione
    }else{
        etMessage('Failed to register');
        setMessageType('danger');
    }
  };

  return (
    <div className="register-wrapper">
      <Navi />
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          <p>Username</p>
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Email</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  setToken: PropTypes.func.isRequired,
};
