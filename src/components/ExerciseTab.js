import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel 
} from '@mui/material';


function ExerciseTab() {

    const [exercises, setExercises] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('');

    useEffect(() => {
        axios.post('http://localhost:3002/exercise/exercises')
          .then(response => {
            if (response.data.success) {
                console.log(JSON.stringify(response.data.data))
              setExercises(response.data.data);
            } else {
              // Handle the case where the API response is not successful
              console.error('Failed to fetch exercises');
            }
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
          });
      }, []);

      const handleLevelChange = (event) => {
        setSelectedLevel(event.target.value);
      };

      return (
        <div>
          <h2>All Exercises in the FitSpace Program</h2>
          <FormControl fullWidth>
            <InputLabel id="level-select-label">Level</InputLabel>
            <Select
              labelId="level-select-label"
              id="level-select"
              value={selectedLevel}
              label="Level"
              onChange={handleLevelChange}
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="bg">Beginner</MenuItem>
              <MenuItem value="adv">Advanced</MenuItem>
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Muscle Group</TableCell>
                  <TableCell align="right">Level</TableCell>
                  <TableCell align="right">Equipment</TableCell>
                  <TableCell align="right">Mets</TableCell>
                  <TableCell align="right">Video URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.filter(exercise => selectedLevel === '' || exercise.level === selectedLevel).map((exercise) => (
                  <TableRow key={exercise._id}>
                    <TableCell component="th" scope="row">
                      {exercise.name}
                    </TableCell>
                    <TableCell align="right">{exercise.category}</TableCell>
                    <TableCell align="right">{exercise.muscleGroup.join(', ')}</TableCell>
                    <TableCell align="right">{exercise.level}</TableCell>
                    <TableCell align="right">{exercise.equipment}</TableCell>
                    <TableCell align="right">{exercise.mets}</TableCell>
                    <TableCell align="right"><a href={exercise.videoUrl} target="_blank" rel="noopener noreferrer">View Video</a></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
}

export default ExerciseTab;
