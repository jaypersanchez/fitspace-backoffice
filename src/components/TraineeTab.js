import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function TraineeTab() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState([]);
  const [currentEndpoint, setCurrentEndpoint] = useState('local');

  const endpoints = {
    local: 'http://localhost:3002/users/allusers',
    remote: 'http://ec2-13-211-184-133.ap-southeast-2.compute.amazonaws.com:3002/users/allusers'
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const url = endpoints[currentEndpoint];
    fetch(url)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, [currentEndpoint]); // Add currentEndpoint as a dependency

  
  useEffect(() => {
    const url = endpoints[currentEndpoint];
    fetch(url)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleUserIdClick = (userId, workoutPlan) => {
    setSelectedUserId(userId);
    setSelectedUserName(selectedUserName);
    setSelectedWorkoutPlan(workoutPlan);
  };

  
  return (
    <div>
      <select value={currentEndpoint} onChange={(e) => setCurrentEndpoint(e.target.value)}>
        <option value="local">Local Endpoint</option>
        <option value="remote">Remote Endpoint</option>
      </select>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Subscription Date</TableCell>
            <TableCell align="right">Next Scheduled Payment</TableCell>
            <TableCell align="right">Stripe Customer ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"
                style={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: user._id === selectedUserId ? 'lightblue' : 'inherit' }}
                onClick={() => handleUserIdClick(user._id, user.workoutPlans)}
              >
                {user._id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.surname}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.level}</TableCell>
              <TableCell align="right">{formatDate(user.subscriptionDate)}</TableCell>
              <TableCell align="right">{formatDate(user.nextPaymentSchedule)}</TableCell>
              <TableCell align="right">{user.stripeId.customerId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* This is where you display the selected user's workout plan */}
    {selectedUserId && (
        <div>
          <h3>Workout Plan for {selectedUserName} User ID: {selectedUserId}</h3>
          {selectedWorkoutPlan.map((week, weekIndex) => (
            <div key={weekIndex}>
              <h4>Week {weekIndex + 1}</h4>
              {week.days.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <strong>Day {dayIndex + 1}:</strong>
                  <ul>
                    {day.exercises.map(exercise => (
                      <li key={exercise._id.$oid}>{exercise.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div> 
  );
  
}

export default TraineeTab;
