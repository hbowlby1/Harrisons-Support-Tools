import { useEffect, useState } from "react";
import { Form, Button, Container, Toast } from "react-bootstrap";

import TheNav from "../app/UI/theNav";

import axios from "axios";

export default function Feedback() {
  const [suggestion, setSuggestion] = useState("");
  const [userFeedback, setUserFeedBack] = useState([]);
  const BASE_URL = "http://admin.local:8000/tool/";

  //loads userfeedback from the database
  const loadFeedback = async () => {
    try {
      const response = await axios.get(BASE_URL + "app_suggestions/");
      setUserFeedBack(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(BASE_URL + "app_suggestions/", {
        suggestion: suggestion,
      });
      loadFeedback();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, [suggestion]);
  const displayFeedback = () => {
    return userFeedback
      .filter((feedback) => feedback.completed !== true)
      .map((feedback) => (
        <Toast key={feedback.id} onClose={() => handleCompleted(feedback.id)}>
          <Toast.Header>
            <strong className="mr-auto">
              {feedback.suggestion.slice(0, 10)}...
            </strong>
            <small>{new Date(feedback.date).toLocaleDateString("en-US")}</small>
          </Toast.Header>
          <Toast.Body>{feedback.suggestion}</Toast.Body>
        </Toast>
      ));
  };

  const handleCompleted = async (id) => {
    try {
      await axios.patch(BASE_URL + "app_suggestions/" + id + "/", {
        completed: true,
      });
      loadFeedback();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <TheNav />
    <Container>
      <h1>Feedback</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="suggestion">
          <Form.Label>Enter your suggestion:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type your suggestion here"
            value={suggestion}
            onChange={(event) => setSuggestion(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {displayFeedback()}
    </Container>
    </>
  );
}
