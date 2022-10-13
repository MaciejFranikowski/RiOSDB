import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { Testcase } from '../../../interfaces/task';

interface NewTestcaseModalProps {
  show: boolean,
  onHide: () => void,
  onSubmit: (testcase: Testcase) => void,
  testcase?: Testcase
}

export default function NewTestcaseModal({
  show, onHide, onSubmit, testcase,
}: NewTestcaseModalProps) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  useEffect(() => {
    setInputText(testcase ? testcase.input : '');
    setOutputText(testcase ? testcase.desiredOutput : '');
  }, [testcase, show]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      id: testcase ? testcase.id : nanoid(),
      input: inputText,
      desiredOutput: outputText,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered className="NewTestcaseModal">
      <Modal.Header closeButton closeVariant="white" className="NewTestcaseModal-header">
        <Modal.Title>{testcase ? 'Edit testcase' : 'Create new testcase'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="NewTestcaseModal-body">

          <Form.Group className="mb-3" controlId="formBasicInput">
            <Form.Label>Testcase input</Form.Label>
            <Form.Control as="textarea" required placeholder="Sample script input..." value={inputText} onChange={(event) => setInputText(event.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicOutput">
            <Form.Label>Testcase expected output</Form.Label>
            <Form.Control as="textarea" required placeholder="Expected script output..." value={outputText} onChange={(event) => setOutputText(event.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="NewTestcaseModal-footer justify-content-between">
          <Button variant="primary" type="submit">
            {testcase ? 'Update testcase' : 'Add new testcase'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
