"use client";

//next.js imports
import Head from "next/head";
import Link from "next/link";

//bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

//component imports
import TheNav from "./UI/theNav";

//css imports
import styles from "./styles/HomePage.modules.css"

//fontawesome import
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function Home() {
  return (
    <>
      <Head>
        <title>Harrison's Support Tools</title>
        <meta
          property="og:title"
          content="Harrison's Support Tools"
          key="title"
        />
      </Head>
      <TheNav />
      <main>
        <Container>
          <h1 className="title">Apps</h1>
          <Row>
            <Col>
              <Link href="/DropZonePage">
                <Button>XML to CSV</Button>
              </Link>
            </Col>
            <Col>
              <Link href="/ToolingProgram">
                <Button>Tooling Program</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
