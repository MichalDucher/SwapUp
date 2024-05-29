import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './styles/Navi.css';

const Navi = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand as={Link} to="/">Cultural Exchange</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/offers">Listings</Nav.Link>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        <Nav.Link as={Link} to="/dashboard">Messages</Nav.Link>
        <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
        <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navi;
