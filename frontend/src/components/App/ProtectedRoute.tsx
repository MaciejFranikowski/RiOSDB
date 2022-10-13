import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { User } from '../../interfaces/user';

type ProtectedRouteProps = {
  user: User | null,
  children?: JSX.Element
};

export default function ProtectedRoute({ user, children }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
}
