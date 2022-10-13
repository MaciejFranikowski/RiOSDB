import React from 'react';
import { Form } from 'react-bootstrap';
import './DetailsCreator.css';

interface DetailsCreatorProps {
  setTitle: (newTitle: string) => void,
  setDescription: (newDescription: string) => void,
  style?: React.CSSProperties
}

export default function DetailsCreator({ setTitle, setDescription, style }: DetailsCreatorProps) {
  return (
    <div style={style}>
      <h1 className="creatorHeader">Exercise details</h1>
      <Form className="detailsForm">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label><h3>Title</h3></Form.Label>
          <Form.Control type="text" placeholder="Sample exercise title" onChange={(event) => setTitle(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label><h3>Description</h3></Form.Label>
          <Form.Control as="textarea" placeholder="Sample exercise description" onChange={(event) => setDescription(event.target.value)} />
        </Form.Group>
      </Form>
    </div>

  );
}
