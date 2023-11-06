import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";

import TheNav from "@/app/UI/theNav";
import Footer from "@/app/components/Footer";

function Roadmap() {
  return (
    <>
      <TheNav />
      <Container className="mt-2">
      <h1 className="text-center">Roadmap</h1>
        <CardGroup className="text-center">
          <Card style={{ width: "18rem" }} bg="primary" text="light" border="dark">
            <Card.Body>
              <Card.Title>Planned</Card.Title>
              <ListGroup>
                <ListGroup.Item className="">create automated task that checks if servers are running</ListGroup.Item>
                <ListGroup.Item className="">update validations upon editing tools</ListGroup.Item>
                <ListGroup.Item className="">create email template for mass orders</ListGroup.Item>
                <ListGroup.Item className="">Add Filters on each header to sort by ascending and descending order</ListGroup.Item>
                <ListGroup.Item className="">*optional* set up themes (light, dark, forest)</ListGroup.Item>
                <ListGroup.Item className="">set up error handling to notify me when an error occurs in the database or backend</ListGroup.Item>
                <ListGroup.Item className="">Make the mobile view more user friendly</ListGroup.Item>
                <ListGroup.Item className="">Fix bug where the tool list does not update after updating tool is out for service</ListGroup.Item>
                <ListGroup.Item className="">update matching tool to be a typeable select dropdown that lists all of the tools</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} bg="warning" text="dark" border="dark">
            <Card.Body>
              <Card.Title>In Progress</Card.Title>
              <ListGroup>
                <ListGroup.Item className="">Update main page to use datagrids</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} bg="light" border="dark">
            <Card.Body>
              <Card.Title>Testing</Card.Title>
              <ListGroup>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} bg="success" text="light" border="dark">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <ListGroup>
              <ListGroup.Item className="">Add a suggestion page for anyone to add to</ListGroup.Item>
              <ListGroup.Item className="">Create individual tool page</ListGroup.Item>
              <ListGroup.Item className="">create this roadmap</ListGroup.Item>
              <ListGroup.Item className="">Update the styling for the search bar</ListGroup.Item>
              <ListGroup.Item className="">create search box that searches for the tool based on the tool name</ListGroup.Item>
              <ListGroup.Item className="">Fix bug where the user has to press the sliders twice before the item updates</ListGroup.Item>
              <ListGroup.Item className="">Inputs reset after tool update and or tool entry</ListGroup.Item>
              <ListGroup.Item className="">Fix bug where the tool entry drop down does not close after entering tool</ListGroup.Item>
              <ListGroup.Item className="">When tools hit their maximum sharpen set them to inactive automatically</ListGroup.Item>
              <ListGroup.Item className="">Change the checkbox of the out for service to a button when the times sharpened is max sharpen that when clicked activates the tools inactivity</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
      <Footer />
    </>
  );
}

export default Roadmap;
