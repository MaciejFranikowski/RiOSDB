import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Test } from '../../../../../interfaces/run';
import './TestDetailsModal.css';

interface TestDetailsModalProps {
  show: boolean,
  test: Test
  onHide: () => void,
}

function TestDetailsModal({ show, test, onHide }: TestDetailsModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered className="TestModal">
      <Modal.Header closeButton closeVariant="white" className="TestModal-header">
        <Modal.Title>
          {`Test case #${test.id} results`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="NewTestcaseModal-body">

        <Form.Group className="mb-3" controlId="formBasicInput">
          <Form.Label>Input</Form.Label>
          <Form.Control as="textarea" value={test.input} readOnly className="DataControl" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicInput">
          <Form.Label>Expected output</Form.Label>
          <Form.Control as="textarea" value={test.expectedOutput} readOnly className="DataControl" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Output</Form.Label>
          <Form.Control as="textarea" type="textarea" value={test.output} readOnly className="DataControl" />
        </Form.Group>

      </Modal.Body>
    </Modal>
  );
}

export default TestDetailsModal;
