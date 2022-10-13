import React, { useState } from 'react';
import {
  Col, Container, ListGroup, ListGroupItem, Row,
} from 'react-bootstrap';
import { CheckSquareFill, XSquareFill } from 'react-bootstrap-icons';
import { Run, Test } from '../../../../interfaces/run';
import TestDetailsModal from './TestDetailsModal/TestDetailsModal';

function RunsList(props: { runs: Run[] }) {
  const [showTestDetailsModal, setShowTestDetailsModal] = useState(false);
  const [testDetails, setTestDetails] = useState<Test>({
    id: 0,
    input: 'string',
    expectedOutput: 'string',
    output: 'string',
    isPassed: 'string',
  });

  const countPassedTests = (tests: Test[]): number => {
    if (tests === [] || tests === undefined) {
      return 0;
    }
    return tests.map((test) => test.isPassed).filter((x) => x === 'Passed').length;
  };
  const isTestPassed = (test: Test): boolean => (test.isPassed === 'Passed');
  const { runs } = props;

  function handleTestDetailsOnClick(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    runID: number,
    testID: number,
  ) {
    setShowTestDetailsModal(true);
    setTestDetails(runs[runID].tests[testID]);
  }

  return (
    <ListGroup className="list-group-main">
      {[...runs].reverse().slice(0, 3).map((run, index) => (
        <ListGroupItem as="li" key={`t${index}`}>
          <Container className="results">
            <Row>
              <Col sm={4} className="d-flex justify-content-center">
                {` RUN # ${runs.length - index}`}
              </Col>
              <Col sm={4} className="d-flex justify-content-center">
                {`Execution time: ${run.executionTime}`}
              </Col>
              <Col sm={4} className="d-flex justify-content-center">
                {`Tests: ${countPassedTests(run.tests)}`}
                /
                {`${run.tests.length}`}
              </Col>
            </Row>
            {run.tests.map((test) => (
              <Row key={test.id}>
                <Col sm={4} className="d-flex border border-2 border-secondary justify-content-center">
                  {`Sample Test Case ${test.id}`}
                </Col>
                <Col className="d-flex border border-2 border-secondary justify-content-center" sm={4} onClick={(event) => handleTestDetailsOnClick(event, runs.length - index - 1, test.id)}>
                  Details
                </Col>
                <Col sm={4} className="d-flex justify-content-center">
                  { isTestPassed(test) ? <CheckSquareFill className="test-success" /> : <XSquareFill className="test-fail" /> }
                </Col>
              </Row>
            ))}
          </Container>
        </ListGroupItem>
      ))}
      <TestDetailsModal
        show={showTestDetailsModal}
        onHide={() => setShowTestDetailsModal(false)}
        test={testDetails}
      />
    </ListGroup>

  );
}

export default RunsList;
