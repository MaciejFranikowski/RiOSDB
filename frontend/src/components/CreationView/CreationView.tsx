import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import {
  Row, Col, Button, Alert,
} from 'react-bootstrap';
import DetailsCreator from './DetailsCreator';
import TestcaseCreator from './TestcaseCreator';
import { Testcase } from '../../interfaces/task';
import { createTask } from '../../services/task.service';
import './CreationView.css';
import { User } from '../../interfaces/user';

type AlertData = {
  visible: boolean;
  text: string;
  variant: string;
};

type CreationViewProps = {
  user: User
};

export default function CreationView({ user }: CreationViewProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testcases, setTestcases] = useState<Testcase[]>([]);
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

  const editTestcase = (indexToUpdate: number, newTestcase: Testcase) => {
    setTestcases(testcases.map((val, index) => (index !== indexToUpdate ? val : newTestcase)));
  };

  const addTestcase = (newTestcase: Testcase) => {
    setTestcases([...testcases, newTestcase]);
  };

  const deleteTestcase = (indexToDelete: number) => {
    setTestcases(testcases.filter((tc, index) => index !== indexToDelete));
  };

  const createNewTask = async () => {
    if (title === '' || description.trim() === '' || testcases.length === 0) {
      showAlert(
        'danger',
        'To create new exercise you need to provide title, description and at least one testcase!',
      );
    } else {
      try {
        const newTask = await createTask({
          title,
          description,
          testcases,
          user,
        });
        showAlert('success', `Task was successfully created! New task ID: ${newTask.id}.`);
      } catch (Error) {
        showAlert('danger', 'Task could not be saved!');
      }
    }
  };

  return (
    <Container fluid className="section d-flex creationView">
      <Row className="flex-fill">
        <Col sm={7} className="p-0" id="leftCreatorPart">
          <DetailsCreator
            style={{ alignSelf: 'center', width: '100%' }}
            setTitle={setTitle}
            setDescription={setDescription}
          />
          <Button size="lg" className="newTaskButton" variant="success" onClick={createNewTask}>
            Add new task
          </Button>
        </Col>
        <Col sm={5} className="p-0">
          <TestcaseCreator
            testcases={testcases}
            addNewTestcase={addTestcase}
            editTestcase={editTestcase}
            deleteTestcase={deleteTestcase}
          />
        </Col>
      </Row>
      <Alert show={alert.visible} variant={alert.variant} className="creationAlert">
        {alert.text}
      </Alert>
    </Container>
  );
}
