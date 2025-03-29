import { useEffect, useState } from 'react'
import './App.css'
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/positions')
      .then(response => response.json())
      .then(data => setPositions(data))

    return () => { }
  }, [])
  return (

    <>
      <Typography variant='h3'> Human Capital Management</Typography>
      <List>
        {positions.map((position: Position) => {
          return (
            <ListItem key={position.id}>
              <ListItemText>{position.title}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>


  )
}

export default App
