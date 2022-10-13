import React, { useEffect, useState } from 'react';
import { PersonSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import LoginModal from './LoginModal';
import { UserCredentials, User } from '../../interfaces/user';
import './LoginPanel.css';

type LoginPanelProps = {
  user: User | null,
  login: (credentials: UserCredentials) => Promise<boolean>,
  logout: () => void,
};

export default function LoginPanel({ user, login, logout }: LoginPanelProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(user ? user.email : '');
  }, [user]);

  const handleSignIn = async (credentials: UserCredentials) => {
    setShowLoginModal(!(await login(credentials)));
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="loginPanel">
      <PersonSquare size="45" className="loginIcon" color={username ? 'green' : 'red'} />
      <div className="loginBox">
        <div className="loginUsername">{username || 'Not logged'}</div>
        {username ? <Button size="sm" variant="outline-light" className="loginButton" type="button" onClick={handleSignOut}>LOGOUT</Button>
          : <Button size="sm" variant="outline-light" className="loginButton" type="button" onClick={() => setShowLoginModal(true)}>LOGIN</Button>}
      </div>
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onSignIn={handleSignIn}
      />
    </div>
  );
}
