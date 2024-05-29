// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  
  let storedUser;
  try {
    storedUser = JSON.parse(localStorage.getItem('user')) || {};
  } catch (error) {
    storedUser = {};
  }
  
  const [user, setUser] = useState(storedUser);
  const [lastSelectedItem, setLastSelectedItem] = useState(null);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser, lastSelectedItem, setLastSelectedItem }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
