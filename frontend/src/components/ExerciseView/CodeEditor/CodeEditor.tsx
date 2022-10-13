import React from 'react';
import { Container, Form } from 'react-bootstrap';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { LanguageSupport } from '@codemirror/language';
import { cpp } from '@codemirror/lang-cpp';
import './CodeEditor.css';

interface Langugage {
  id: string,
  name: string,
  langObj: LanguageSupport
}

interface CodeEditorProps {
  setCode: (code: string) => void
  setLanguage: (language: string) => void
}

function CodeEditor({ setCode, setLanguage }: CodeEditorProps) {
  const supportedLangugages: Langugage[] = [
    { id: 'python', name: 'Python', langObj: python() },
    { id: 'cpp', name: 'C++', langObj: cpp() },
  ];

  const [currentLanguage, setCurrentLanguage] = React.useState(supportedLangugages[0]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = supportedLangugages.find((item) => item.id === event.target.value);
    if (lang === undefined) { return; }
    setCurrentLanguage(lang);
    setLanguage(lang.id);
  };

  return (
    <Container fluid className="d-flex flex-column code-editor p-0" style={{ height: '100%' }}>
      <Container className="d-flex flex-row-reverse p-3 align-items-right">
        <Form.Select aria-label="Choose programming language" className="form-select-unfilled bg-transparent" onChange={(event) => handleSelectChange(event)}>
          {supportedLangugages.map(
            (lang) => <option key={lang.id} value={lang.id}>{lang.name}</option>,
          )}
        </Form.Select>
      </Container>
      <CodeMirror
        className="flex-fill"
        height="100%"
        theme={oneDark}
        value="console.log('hello world!');"
        extensions={[currentLanguage.langObj]}
        onChange={(value) => {
          setCode(value);
        }}
      />
    </Container>
  );
}

export default CodeEditor;
