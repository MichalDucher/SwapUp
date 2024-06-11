// src/pages/login/Login.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AUTHENTICATE_URL, USERS_URL } from '../../data/api';
import { authorizedFetch } from '../../data/authorized-fetch';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Navi from '../../components/Navi'
import './Login.css';

async function loginUser(credentials) {
  return fetch(AUTHENTICATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email: username,
      password: password,
    });
    if (response.token) {
      setToken(response.token);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      login(response.token, response.user);

      const userResponse = await authorizedFetch(USERS_URL, {
        method: 'GET',
      });

      const userData = await userResponse.json();
      const foudUser = userData.find(user => user.email === sessionStorage.getItem("username"));
      sessionStorage.setItem("id", foudUser.id);

      navigate('/');
    }
  };

  return (
    <div className="login-wrapper">
      <Navi/>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
