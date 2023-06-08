import React from "react";

//next.js components
import Link from "next/link";

//bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

//custom CSS imports
import styles from "../styles/TheNav.module.css";

function TheNav() {
  return (
    <Container>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className={styles.noUnderline}>
              <span className={`nav-link`}>Home</span>
            </Link>
            <Link href="/DropZonePage" className={styles.noUnderline}>
              <span className="nav-link">XMLtoCSV</span>
            </Link>
            <Link href="/ToolingProgram" className={styles.noUnderline}>
              <span className="nav-link">Tooling Program</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default TheNav;
