import { Navigate } from 'react-router-dom';
import Auth from '../utils/auth';

const ProtectedRoute = ({ element, isAdminRoute = false }) => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }

  if (isAdminRoute && !Auth.getProfile().authenticatedPerson.isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
