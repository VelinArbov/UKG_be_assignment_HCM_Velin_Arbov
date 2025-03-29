import { useEffect, useState } from 'react'
import './style.css'
import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import PositionsDashboard from '../../features/positions/dashboard/PositionsDashboard';

function App() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Position[]>('https://localhost:5001/api/positions')
      .then(response => setPositions(response.data))

    return () => { }
  }, [])

  const handleSelectedPosition = (id: string) => {
    setSelectedPosition(positions.find(x => x.id === id));
  }

  const handleCancelPosition = () => {
    setSelectedPosition(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectedPosition(id);
    else handleCancelPosition();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }


  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee' }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          <PositionsDashboard positions={positions}
            selectPosition={handleSelectedPosition}
            cancelPosition={handleCancelPosition}
            selectedPosition={selectedPosition}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose} />
        </Container>
      </Box>
    </>
  )
}

export default App
