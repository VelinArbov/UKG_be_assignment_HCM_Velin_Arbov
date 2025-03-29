import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
    closeForm: () => void;
    position?: Position;
}

export default function PositionForm({ closeForm, position }: Props) {
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Add Position</Typography>
            <Box component='form' display='flex' flexDirection='column' gap={3}>
                <TextField label='Title' value={position?.title} />
                <TextField label='Description' multiline rows={3} />
                <TextField label='Date' type='date' />
                <TextField label='City' />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={closeForm} color="inherit">Cancel</Button>
                    <Button color="success" variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}