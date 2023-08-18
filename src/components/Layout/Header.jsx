import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { AuthContex } from "../../context/AuthContex";

import "./main.scss";

const Header = () => {
  const { isAuthenticated ,role } = useContext(AuthContex);

  return (
    <header>
      <Navbar expand="md" className="pt-4 pb-4  navigate">
        <Container>
          <Navbar.Brand>
            {isAuthenticated ? (
              <Link to="/my-posts">
                {" "}
                <h2 style={{ padding: 0, color: "#fff", margin: 0 }}>
                  My Blogs
                </h2>
              </Link>
            ) : (
              <Link>
                <img src="/navLogo.svg" alt="" />
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg bg-light"
            aria-controls={`offcanvasNavbar-expand-md`}
          />
          <Navbar.Offcanvas
            className="bg-secondary"
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end align-items-center flex-grow-1 gap-5 pe-3">
                <Link className="nav_title" to="/">
                  Home
                </Link>
                <Link className="nav_title" to="/all-posts">
                  Posts
                </Link>
                <Link className="nav_title" to="/about">
                  About Us
                </Link>
                <Link className="nav_title" to="/register">
                  Register
                </Link>
                <Button variant="light" className="nav_button">
                  {!(role==="admin") ? (
                    <Link className="btn " to="/login">
                      Login
                    </Link>
                  ) : (
                    <Link>Account</Link>
                  )}
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
