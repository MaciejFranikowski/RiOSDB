import React, { useState } from 'react';
import {
  Container, Form, Button, Col, Row,
} from 'react-bootstrap';
import './RegisterView.css';
import { UserDetails } from '../../interfaces/user';
import { registerUser } from '../../services/auth.service';

function RegisterView() {
  const [details, setDetails] = useState<UserDetails>({
    firstName: '', lastName: '', email: '', password: '',
  });
  const [correctPassword, setCorrectPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await registerUser(details);
  };

  return (
    <Container className="RegisterView">
      <Row>
        <Col sm={2} />
        <Col sm={8}>
          <h1 className="text-center">Register new account</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control required type="text" placeholder="Enter your first name" onChange={(event) => setDetails({ ...details, firstName: event.target.value })} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control required type="text" placeholder="Enter your last name" onChange={(event) => setDetails({ ...details, lastName: event.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" onChange={(event) => setDetails({ ...details, email: event.target.value })} />
              <Form.Text className="text-muted">
                We&apos;ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <div className="divider" />
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" onChange={(event) => setDetails({ ...details, password: event.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter password again</Form.Label>
              <Form.Control required style={{ backgroundColor: correctPassword ? 'lightgreen' : 'lightcoral' }} type="password" placeholder="Password" onChange={(event) => setCorrectPassword(event.target.value === details.password)} />
            </Form.Group>

            <Form.Group className="mb-3 d-flex justify-content-center" controlId="formBasicCheckbox">
              <Button className="mt-5" size="lg" variant="primary" type="submit">
                REGISTER
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={2} />
      </Row>
    </Container>
  );
}

export default RegisterView;
