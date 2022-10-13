import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Run } from '../../../../interfaces/run';

import RunsList from './RunsList';

function AccordionExercise(props: { title: string, description: string, runs: Run[] }) {
  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0" className="accord-group">
        <Accordion.Header className="accord-infos">
          {`${props.title}`}
        </Accordion.Header>
        <Accordion.Body className="accord-body accordion-body-text">
          {`${props.description}`}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="accord-group">
        <Accordion.Header className="accord-infos"> Run history </Accordion.Header>
        <Accordion.Body className="accord-body p-0 runs-list">
          <RunsList runs={props.runs} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionExercise;
