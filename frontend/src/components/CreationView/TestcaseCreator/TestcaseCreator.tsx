import React, { useState } from 'react';
import { ListGroup, CloseButton } from 'react-bootstrap';
import { PencilSquare, PlusSquareFill } from 'react-bootstrap-icons';
import { Testcase } from '../../../interfaces/task';
import NewTestcaseModal from './NewTestcaseModal';
import './TestcaseCreator.css';

interface TestcaseCreatorProps {
  testcases: Testcase[],
  addNewTestcase: (testcase: Testcase) => void,
  editTestcase: (index: number, newTestcase: Testcase) => void,
  deleteTestcase: (index: number) => void
}

export default function TestcaseCreator({
  testcases, addNewTestcase, editTestcase, deleteTestcase,
}: TestcaseCreatorProps) {
  const [selectedTestcase, setSelectedTestcase] = useState(-1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleEditTestcase = (index: number) => {
    setSelectedTestcase(index);
    setShowLoginModal(true);
  };

  const handleHide = () => {
    setShowLoginModal(false);
  };

  const handleSubmit = (newTestcase: Testcase) => {
    handleHide();
    if (selectedTestcase >= 0) {
      editTestcase(selectedTestcase, newTestcase);
    } else {
      addNewTestcase(newTestcase);
    }
  };

  const handleNewTestcase = () => {
    setSelectedTestcase(-1);
    setShowLoginModal(true);
  };

  const handleDeleteTestcase = (indexToDelete: number) => {
    deleteTestcase(indexToDelete);
  };

  return (
    <div className="testcaseCreator">
      <div className="testcaseHeader">
        <h2>Task&apos;s testcases</h2>
        <PlusSquareFill size="45" onClick={handleNewTestcase} />
      </div>
      <ListGroup>
        {testcases.map((tc, index) => (
          <ListGroup.Item key={tc.id} className="testcaseItem">
            <h4>
              Testcase #
              {index + 1}

            </h4>
            <div className="iconsItem">
              <PencilSquare size="20" className="mx-3" onClick={() => handleEditTestcase(index)} />
              <CloseButton variant="white" onClick={() => handleDeleteTestcase(index)} />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <NewTestcaseModal
        show={showLoginModal}
        onHide={handleHide}
        onSubmit={handleSubmit}
        testcase={selectedTestcase < 0 ? undefined : testcases[selectedTestcase]}
      />
    </div>
  );
}
