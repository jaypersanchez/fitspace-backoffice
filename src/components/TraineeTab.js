import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function TraineeTab() {
  const [users, setUsers] = useState([]);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    fetch('http://localhost:3002/users/allusers')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
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
              <TableCell component="th" scope="row">
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
  );
  
}

export default TraineeTab;
