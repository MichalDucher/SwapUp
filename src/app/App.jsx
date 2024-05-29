import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Preferences from './pages/preferences/Preferences';
import Home from './pages/home/Home';
import Offers from './pages/offers/Offers';
import useToken from './hooks/useToken';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;