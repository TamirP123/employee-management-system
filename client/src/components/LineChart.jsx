import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

function LineChartComponent() {
  // Define your data
  const data = [
    { name: 'January', revenue: 12000 },
    { name: 'February', revenue: 19000 },
    { name: 'March', revenue: 3000 },
    { name: 'April', revenue: 5000 },
    { name: 'May', revenue: 2000 },
    { name: 'June', revenue: 3000 },
    { name: 'July', revenue: 7000 }
  ];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Revenue Sales
          </Typography>
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4CAF50"
              activeDot={{ r: 8 }}
              animationDuration={1000}  // Animation duration in milliseconds
            />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
}

export default LineChartComponent;
