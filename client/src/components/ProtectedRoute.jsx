import { Navigate, Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import Auth from '../utils/auth';

const ProtectedRoute = ({ element, isAdminRoute = false }) => {
  if (!Auth.loggedIn()) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Box>
        <img 
          src="https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png" 
          alt="Error" 
          style={{ maxWidth: '15%', height: 'auto', marginBottom: '20px' }}
        />
      </Box>

      <Typography variant="h4" component="h1" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The do not have access to the page you are looking for.
      </Typography>

    
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
    );
  }

  if (isAdminRoute && !Auth.getProfile().authenticatedPerson.isAdmin) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
