import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";



export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73, 0%, #218aaa 69%, #20a7ac 89%)' }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize="large" />
                                <Typography variant="h4" fontWeight='bold'>HCM</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItemLink to='/positions'>
                                Positions
                            </MenuItemLink>
                            <MenuItemLink
                                to='/createPosition'>
                                Create Position
                            </MenuItemLink>
                        </Box>
                        <MenuItem> User menu </MenuItem>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
