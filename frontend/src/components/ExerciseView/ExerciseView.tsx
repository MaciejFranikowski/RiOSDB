import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Col, Alert } from 'react-bootstrap';
import AttemptInfo from './AttemptInfo';
import CodeEditor from './CodeEditor';
import './ExerciseView.css';
import { getExercise, executeCode } from '../../services/exercise.service';

type AlertData = {
  visible: boolean;
  text: string;
  variant: string;
};

function ExerciseView() {
  const params = useParams();
  const [codeContent, setCodeContent] = useState('console.log("hello world!");');
  const [exerciseContent, setExerciseContent] = useState({ title: '', description: '' });
  const [language, setLanguage] = useState('python');
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
  };

  const setCode = (code: string) => {
    setCodeContent(code);
  };

  const setLang = (lang: string) => {
    setLanguage(lang);
  };

  const getExerciseInfo = async (id: number) => {
    try {
      const info = await getExercise(id);
      setExerciseContent(info);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showAlert('danger', error.message);
      }
    }
  };

  const runCode = async () => {
    try {
      const newRun = await executeCode(
        codeContent,
        language,
        params.id || '',
      );
      return newRun;
    } catch (error: unknown) {
      if (error instanceof Error) {
        showAlert('danger', error.message);
      }
      return [];
    }
  };

  useEffect(() => {
    getExerciseInfo(parseInt(params.id || '', 10));
  }, []);

  return (
    <Container fluid className="section d-flex">
      <Row className="flex-fill p-0">
        <Col sm={7} className="p-0"><CodeEditor setCode={setCode} setLanguage={setLang} /></Col>
        <Col sm={5} className="p-0"><AttemptInfo exerciseInfo={exerciseContent} runCode={runCode} /></Col>
      </Row>
      <Alert show={alert.visible} onClose={() => hideAlert()} variant={alert.variant} className="errorAlert" dismissible>
        <Alert.Heading> Error occured !</Alert.Heading>
        {alert.text}
      </Alert>
    </Container>
  );
}

export default ExerciseView;
