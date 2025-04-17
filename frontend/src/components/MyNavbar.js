import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLogout } from '../hooks/useLogout';

const MyNavbar = () => {
  const {logout} = useLogout();

  const handleClick = () =>{
    logout();
  }


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Workout Calendar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link onClick={handleClick}>Logout</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;