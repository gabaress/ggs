import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const CustomNavbar = () => {
  return (
    <Navbar bg="danger" variant="dark">
      <Navbar.Brand as={Link} to="/" style={{ paddingLeft: '1vw'}}>CLothes Inc.</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
        <Nav.Link as={Link} to="/status">Orders By Status</Nav.Link>
        <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
