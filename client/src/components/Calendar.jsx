import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const HighlightedPaper = styled(Paper)(({ theme, isToday }) => ({
  backgroundColor: isToday ? theme.palette.primary.main : theme.palette.background.paper,
  color: isToday ? theme.palette.primary.contrastText : theme.palette.text.primary,
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    minWidth: '30px',
    padding: theme.spacing(0.5),
    fontSize: '0.75rem',
  },
}));

const WeeklyCalendar = () => {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDayIndex);

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ padding: 1 }}>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {weekDays.map((date, index) => (
          <Grid item xs={1} key={index}> 
            <HighlightedPaper 
              isToday={index === currentDayIndex} 
              sx={{ height: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <Typography variant="caption">{daysOfWeek[date.getDay()]}</Typography>
              <Typography variant="body2">{date.getDate()}</Typography>
            </HighlightedPaper>
          </Grid>
        ))}
      </Grid>      
      <Grid container spacing={2} marginTop={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 1, textAlign: 'center' }}>
            <Typography variant="body2">
              <span>{currentTime.toLocaleTimeString().split(' ')[0]}</span>
              <Typography variant="caption">{currentTime.toLocaleTimeString().split(' ')[1]}</Typography>
            </Typography>
            <Typography variant="caption">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeeklyCalendar;
