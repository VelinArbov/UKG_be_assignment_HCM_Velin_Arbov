import { Group } from "@mui/icons-material";
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from "@mui/material";



export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73, 0%, #218aaa 69%, #20a7ac 89%)' }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <MenuItem sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight='bold'>Human Capital Management</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Positions
                            </MenuItem>
                            <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                About
                            </MenuItem>
                            <MenuItem sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Contact
                            </MenuItem>
                        </Box>
                        <Button onClick={() => { }} size='large' variant="contained" color="warning">Add Position</Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
