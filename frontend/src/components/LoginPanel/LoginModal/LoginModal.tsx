import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import './LoginModal.css';
import { Link } from 'react-router-dom';
import { UserCredentials } from '../../../interfaces/user';

interface LoginModalProps {
  show: boolean,
  onHide: () => void,
  onSignIn: (credentials: UserCredentials) => void,
}

export default function LoginModal({
  show, onHide, onSignIn,
}: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSignIn({ email, password });
  };

  return (
    <Modal show={show} onHide={onHide} centered className="LoginModal">
      <Modal.Header closeButton closeVariant="white" className="LoginModal-header">
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="LoginModal-body">

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="LoginModal-footer justify-content-between">
          <div>
            <a href="localhost">I forgot my password</a>
            <div>
              No account?
              {' '}
              <Link to="/register" onClick={onHide}>Register!</Link>
            </div>
          </div>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
