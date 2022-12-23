import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserCredentials, User } from '../../interfaces/user';
import LoginPanel from '../LoginPanel';
import './MainNavbar.css';

type MainNavbarProps = {
  user: User | null,
  login: (credentials: UserCredentials) => Promise<boolean>,
  logout: () => void,
};

function MainNavbar({ user, login, logout }: MainNavbarProps) {
  return (
    <Navbar style={{ flexShrink: 0 }} bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>
          <NavLink id="brandLogo" to="/">
            OpenSPOJ
          </NavLink>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="pr-4" href="/exerciseList">
            Exercises
          </Nav.Link>
          <NavLink className="mx-4 btn btn-primary" to="/createExercise">
            Create exercise
          </NavLink>
        </Nav>
        <LoginPanel user={user} login={login} logout={logout} />
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
