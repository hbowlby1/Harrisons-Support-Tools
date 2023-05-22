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
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Link href="/" className={styles.noUnderline}>
            <span className={`nav-link`}>Home</span>
          </Link>
          <Link href="/DropZonePage" className={styles.noUnderline}>
          <span className="nav-link">XMLtoCSV</span>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TheNav;
