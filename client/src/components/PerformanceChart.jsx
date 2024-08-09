import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Grow } from '@mui/material';

const PerformanceChart = () => {
  const departments = [
    { name: 'Developers', percentage: 80, color: 'success' },
    { name: 'Marketing', percentage: 65, color: 'primary' },
    { name: 'Sales', percentage: 45, color: 'warning' },
  ];

  return (
    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Performance
        </Typography>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Department</th>
              <th scope="col">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index}>
                <td className="align-middle">{dept.name}</td>
                <td>
                  <Grow in timeout={1000}>
                    <LinearProgress
                      variant="determinate"
                      value={dept.percentage}
                      color={dept.color}
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Grow>
                  <Typography variant="body2" color="textSecondary" align="right">
                    {dept.percentage}%
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
