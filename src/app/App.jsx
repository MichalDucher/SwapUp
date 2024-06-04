// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { useState } from 'react';
import Home from './pages/home/Home';
import Offers from './pages/offers/Offers';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Purchase from './pages/purchase/Purchase';
import AddOffer from './pages/offers/AddOffer';


const App = () => {
  const [token, setToken] = useState(null); // Tutaj inicjujesz stan tokenu

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/add-offer" element={<AddOffer />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/login"
            element={<Login setToken={setToken} />} // Tutaj przekazujesz setToken do komponentu Login
          />
          <Route path="/purchase/:id" element={<Purchase />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;