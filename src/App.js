import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TraineeTab from './components/TraineeTab';
import ExerciseTab from './components/ExerciseTab';

function App() {

  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={activeTab} onChange={handleChange}>
      <Tab label="Trainees" />
      <Tab label="Exercise Programs" />
    </Tabs>
    {activeTab === 0 && <TraineeTab />}
    {activeTab === 1 && <ExerciseTab />}
  </Box>
  );
}

export default App;
