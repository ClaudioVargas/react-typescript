import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../features/auth/services/token.service';

interface Props {
  children: JSX.Element;
}

// For React Router v6 - protect routes by checking token presence
export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
