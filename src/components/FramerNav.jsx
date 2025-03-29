import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCropSimple } from '@fortawesome/free-solid-svg-icons'
import {faGithub} from "@fortawesome/free-brands-svg-icons";

function FramerNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">
          <FontAwesomeIcon icon={faCropSimple} />
          {" "}
          Framer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link href="https://github.com/ajford/profileFramer">
              <FontAwesomeIcon icon={faGithub} size={"xl"} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FramerNav;