import { useState } from 'react'
import './style.css'
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import NavBar from './NavBar';
import PositionsDashboard from '../../features/positions/dashboard/PositionsDashboard';
import { usePositions } from '../../lib/hooks/usePositions';

function App() {
  const [selectedPosition, setSelectedPosition] = useState<Position | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { positions, isPending } = usePositions();

  const handleSelectedPosition = (id: string) => {
    setSelectedPosition(positions!.find(x => x.id === id));
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


  const handleDelete = (id: string) => {
    console.log(id)
  }



  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
        <CssBaseline />
        <NavBar openForm={handleOpenForm} />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
          {!positions || isPending ? (
            <Typography>Loading....</Typography>
          ) : (
            <PositionsDashboard positions={positions}
              selectPosition={handleSelectedPosition}
              cancelPosition={handleCancelPosition}
              selectedPosition={selectedPosition}
              editMode={editMode}
              openForm={handleOpenForm}
              closeForm={handleFormClose}
              deletePosition={handleDelete} />
          )}
        </Container>
      </Box>
    </>
  )
}

export default App
