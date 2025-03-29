import { useEffect, useState } from 'react'
import './App.css'
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function App() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    axios.get<Position[]>('https://localhost:5001/api/positions')
      .then(response => setPositions(response.data))

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
