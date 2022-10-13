import React, { useState, useEffect } from 'react';
import {
  Alert, Card, Col, Form, Row,
} from 'react-bootstrap';
import { getAllExercises } from '../../services/exercise.service';
import ExerciseCard from './ExerciseCard';
import './ExerciseListView.css';

type AlertData = {
  visible: boolean;
  text: string;
  variant: string;
};

type Exercise = {
  id: number;
  title: string;
  description: string;
};

function ExerciseListView() {
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState<AlertData>({
    visible: false,
    text: '',
    variant: 'danger',
  });

  const hideAlert = () => {
    setAlert((prevAlert: AlertData) => ({ ...prevAlert, visible: false }));
  };

  const showAlert = (variant: string, text: string) => {
    setAlert({ visible: true, text, variant });
    setTimeout(() => hideAlert(), 4000);
  };

  const getExercisesList = async () => {
    try {
      const exercises = await getAllExercises();
      setExerciseList(exercises);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showAlert('danger', error.message);
      }
    }
  };

  useEffect(() => {
    getExercisesList();
  }, []);

  function handleQueryChange(newQuery: string) {
    setSearchQuery(newQuery);
  }

  const isSeen = (item: any) => {
    const preparedDescription = item.description.trim().toLowerCase();
    const trimmedQuery = searchQuery.trim().toLowerCase();
    return preparedDescription.includes(trimmedQuery);
  };

  return (
    <Row className="ExerciseListView">
      <Col sm={3} className="d-flex justify-content-center align-items-start">
        <Card bg="secondary" className="p-2 SearchCard">
          <Card.Title> Search your ideal exercise</Card.Title>
          <Form>
            <Form.Group className="mb-2" controlId="formQuery">
              <Form.Control
                className="QueryInput"
                as="textarea"
                rows={3}
                placeholder="Enter searching query..."
                onChange={(event) => handleQueryChange(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Card>
      </Col>

      <Col sm={6}>
        {exerciseList.filter(isSeen).map((item) => (
          <ExerciseCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </Col>
      <Col sm={3} />
      <Alert show={alert.visible} variant={alert.variant} className="exerciseListAlert">
        {alert.text}
      </Alert>
    </Row>
  );
}

export default ExerciseListView;
