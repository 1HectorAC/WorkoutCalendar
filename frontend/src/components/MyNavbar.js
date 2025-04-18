import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const MyNavbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
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
            {user && (
              <div>
                <span style={{display:'inline', color:'white'}}>{user.email}</span>
                <Nav.Link style={{display:'inline'}} onClick={handleClick}>Logout</Nav.Link>
              </div>
            )}
            {!user && (
              <div>
                <Nav.Link style={{display:'inline'}} href="/signup">Signup</Nav.Link>
                <Nav.Link style={{display:'inline'}} href="/login">Login</Nav.Link>
                
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;