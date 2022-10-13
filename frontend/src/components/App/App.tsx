import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainNavbar from '../MainNavbar';
import {
  AuthenticationError, getCurrentUser, loginUser, logoutUser,
} from '../../services/auth.service';
import { User, UserCredentials } from '../../interfaces/user';
import ExerciseView from '../ExerciseView';
import ExerciseListView from '../ExerciseListView';
import RegisterView from '../RegisterView';
import CreationView from '../CreationView';
import ProtectedRoute from './ProtectedRoute';

type AlertData = {
  visible: boolean;
  text: string;
  variant: string;
};

function App() {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [alert, setAlert] = useState<AlertData>({ text: '', visible: false, variant: 'danger' });

  const hideAlert = (time: number) => {
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, time);
  };

  const login = async (credentials: UserCredentials): Promise<boolean> => {
    let newUser: User;
    try {
      newUser = await loginUser(credentials);
    } catch (exc) {
      if (exc instanceof AuthenticationError) {
        setAlert({ text: exc.message, visible: true, variant: 'danger' });
        hideAlert(4000);
      }
      return false;
    }
    setUser(newUser);
    return true;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <Container fluid className="App d-flex flex-column" style={{ height: '100vh' }}>
      <MainNavbar user={user} login={login} logout={logout} />
      <div className="body flex-fill">
        <Routes>
          <Route path="register" element={<RegisterView />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="exercise/:id" element={<ExerciseView />} />
            <Route path="exerciseList" element={<ExerciseListView />} />
            <Route path="createExercise" element={<CreationView user={user!} />} />
          </Route>
        </Routes>
      </div>
      <Alert show={alert.visible} variant={alert.variant} className="creationAlert">
        {alert.text}
      </Alert>
    </Container>
  );
}

export default App;
