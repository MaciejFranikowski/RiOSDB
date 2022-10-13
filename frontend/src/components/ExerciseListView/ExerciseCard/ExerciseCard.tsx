import React from 'react';
import {
  Card, Container, Col, Row,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './ExerciseCard.css';

interface CardProps {
  id: number,
  title: string,
  description: string,
}

const MAX_DESCRIPTION_LEN = 250;
const buildExercisePath = (id: number) => `/exercise/${id}`;

function shorten(str: string, maxLen: number, separator = ' ') {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

function ExerciseCard(props: CardProps) {
  return (
    <Container className="ExerciseCard d-flex justify-content-center">
      <Card bg="secondary" style={{ width: '60rem' }} className="mb-auto">
        <Card.Header as="h5">
          <Row>
            <Col sm={11}>
              {props.title}
            </Col>
            <Col sm={1} className="d-flex justify-content-end">
              {props.id}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="d-flex justify-content-center">
            <Col sm={9}>
              {shorten(props.description, MAX_DESCRIPTION_LEN)}
            </Col>
            <Col sm={3} className="d-flex justify-content-center align-items-center">
              <NavLink className="mb-2 btn btn-success btn-challenge-link" to={buildExercisePath(props.id)}>
                Solve Challenge
              </NavLink>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ExerciseCard;
