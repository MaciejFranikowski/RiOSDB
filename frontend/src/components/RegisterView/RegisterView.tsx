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
  const [errors, setErrors] = useState({
    firstName: '', lastName: '', password: '',
  });
  const setFieldFirstName = (value: string) => {
    setDetails({
      ...details,
      firstName: value,
    });
    if (errors.firstName) {
      setErrors({
        ...errors,
        firstName: '',
      });
    }
  };
  const setFieldLastName = (value: string) => {
    setDetails({
      ...details,
      lastName: value,
    });
    if (errors.lastName) {
      setErrors({
        ...errors,
        lastName: '',
      });
    }
  };
  const setFieldPassword = (value: string) => {
    setDetails({
      ...details,
      password: value,
    });
    if (errors.password) {
      setErrors({
        ...errors,
        password: '',
      });
    }
  };
  const [correctPassword, setCorrectPassword] = useState(false);
  const validateForm = () => {
    const {
      firstName, lastName, password,
    } = details;
    const newErrors = {
      firstName: '', lastName: '', password: '',
    };
    if (firstName === '' || !/^[a-zA-Z()]+$/.test(firstName)) { newErrors.firstName = 'Please make sure that the first name is only letters'; }
    if (lastName === '' || !/^[a-zA-Z()]+$/.test(lastName)) { newErrors.lastName = 'Please make sure that the last name is only letters'; }
    if (password === '' || password.length < 8) { newErrors.password = 'Please make sure that the at least 8 characters long'; }
    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (formErrors.firstName !== '' || formErrors.lastName !== '') {
      setErrors(formErrors);
    } else {
      await registerUser(details);
    }
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
              <Form.Control
                required
                type="text"
                placeholder="Enter your first name"
                onChange={(event) => setFieldFirstName(event.target.value)}
                isInvalid={errors.firstName !== ''}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                onChange={(event) => setFieldLastName(event.target.value)}
                isInvalid={errors.lastName !== ''}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
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
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(event) => setFieldPassword(event.target.value)}
                isInvalid={errors.password !== ''}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
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
