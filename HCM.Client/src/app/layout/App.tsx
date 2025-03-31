import './style.css'
import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import PositionsDashboard from '../../features/positions/dashboard/PositionsDashboard';

function App() {
  return (
    <>
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
        <CssBaseline />
        <NavBar />
        <Container maxWidth='xl' sx={{ mt: 3 }}>
            <PositionsDashboard/>
        </Container>
      </Box>
    </>
  )
}

export default App
