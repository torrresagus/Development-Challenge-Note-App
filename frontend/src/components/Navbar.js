// Navbar.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import logo from "../img/Notes.png";
import Button from 'react-bootstrap/Button';

function NotesNavbar() {
  // State to track mouse hover
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle log out
  const handleLogedOut = () => {
    console.log('Log out');
    // TO DO - Log out
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" style={styles.navbar}>
      <Container>
        <Navbar.Brand>
          <img 
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Notes App
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Button 
            style={isHovered ? styles.hoveredlogOutButton : styles.logOutButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleLogedOut}
          >
            Log out
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

const styles = {
  navbar: {
    borderRadius: '10px',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    margin: '20px auto',
    maxWidth: '75%',
    width: '100%',
  },
  logOutButton: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '15px',
    marginRight: '10px',
    border: 'none'
  },
  hoveredlogOutButton: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '15px',
    boxShadow: '0px 8px 15px rgba(255, 255, 255, 0.5)',
    marginRight: '10px',
    border: 'none'
  }
}

export default NotesNavbar;
