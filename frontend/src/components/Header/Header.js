import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header-wrapper">
      <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand>
            <Link className="nav-item" to="/">
              iTunesSearcher
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Item>
                <Link className="nav-item" to="/">
                  {" "}
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-item" to="/favourites">
                  Favourites
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
