import { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import axios from "axios";

export default function Feedback() {
    const [suggestion, setSuggestion] = useState('');
    const [userFeedback, setUserFeedBack] = useState({})
    const BASE_URL = "http://admin.local:8000/tool/"

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
        try{
            await axios.post(BASE_URL + "app_suggestions/", {
              suggestion: suggestion,  
            });
            loadFeedback();
        }catch (err){
            console.log(err);
        }
    };

    useEffect(() => {
        loadFeedback();
    }, [suggestion]);

    return (
        <>
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

        <Container>
            <h1>Feedback</h1>
            {Object.keys(userFeedback).length === 0 ? (
                <p>No feedback yet</p>
            ) : (
                <ul>
                    {userFeedback.map((feedback) => (
                        <li key={feedback.id}>{feedback.suggestion}</li>
                    ))}
                </ul>
            )}
        </Container>
        </>
    );
}
