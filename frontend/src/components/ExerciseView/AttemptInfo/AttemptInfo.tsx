import React, { useState } from 'react';
import './AttemptInfo.css';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import AccordionExercise from './AccordionExercise/AccordionExercise';
import { Run } from '../../../interfaces/run';

interface AttemptInfoProps {
  runCode: () => Promise<Run | never[]>,
  exerciseInfo: JSX.IntrinsicAttributes & {
    title: string,
    description: string,
  }
}

function AttemptInfo(props: AttemptInfoProps) {
  const [runs, setRuns] = useState<Run[]>([]);

  const handleRunTests = async () => {
    const newRun = await props.runCode();
    if (newRun !== undefined) {
      setRuns(runs.concat(newRun));
    }
  };
  return (
    <Container className="d-flex flex-column p-0 section infos">
      <Row className="flex-fill">
        <Col>
          <AccordionExercise
            title={props.exerciseInfo.title}
            description={props.exerciseInfo.description}
            runs={runs}
          />
        </Col>
      </Row>
      <Row className="justify-self-end align-self-center">
        <Col className="d-flex justify-content-center">
          <button type="button" className="btn btn-success btn-run-tests" onClick={handleRunTests}> Run Tests </button>
        </Col>
      </Row>
    </Container>
  );
}

export default AttemptInfo;
