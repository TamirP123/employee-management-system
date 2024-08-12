import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Avatar, Typography, Button, Container, Card, CardContent, Grid } from '@mui/material';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_PROFILE_PICTURE } from '../utils/mutations';
import CloudinaryUploadWidget from '../components/CloudinaryUploadWidget';
import SidePanel from '../components/SidePanel';

const ViewProfile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
  const user = data?.me || {};
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (imageUrl) => {
    setPreviewImage(imageUrl);
    setIsSubmitting(true);
  };

  const handleConfirmSubmit = () => {
    updateProfilePicture({ variables: { userId: user._id, profilePicture: previewImage } })
      .then(() => {
        setIsSubmitting(false);
        setPreviewImage(null);
      });
  };

  const handleCancelSubmit = () => {
    setPreviewImage(null); 
    setIsSubmitting(false); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Grid container>
      <Grid item xs={2}>
        <SidePanel />
      </Grid>
      <Grid item xs={9}>
        <Container>
          <Card sx={{ maxWidth: 800, margin: 'auto', mt: 5 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Avatar
                    alt={user.username}
                    src={previewImage || user.profilePicture}
                    sx={{ width: 100, height: 100, margin: 'auto', mb: 2, borderRadius: '50%' }}
                  />
                  <Typography variant="h6" align="center">{user.username}</Typography>
                  <Typography variant="body2" align="center">
                    {user.isAdmin ? 'Admin' : 'Employee'}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                  <i className="fa-solid fa-envelope "></i> {user.email}
                  </Typography>
                  <Typography variant="body1">
                    {user.clockedIn
                      ? `You are currently clocked in.`
                      : 'You are not clocked in'}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                {!isSubmitting ? (
                  <CloudinaryUploadWidget onImageUpload={handleImageUpload} />
                ) : (
                  <>
                    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                      Do you want to submit this photo as your profile picture?
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleConfirmSubmit}
                      sx={{ mt: 2 }}
                    >
                      Yes, Submit
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={handleCancelSubmit}
                      sx={{ mt: 2, ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ViewProfile;
