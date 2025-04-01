import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { usePositions } from "../../../lib/hooks/usePositions";
import { Position } from "../../../lib/types";
import { useNavigate, useParams } from "react-router";



export default function PositionForm() {

    const { id } = useParams();
    const { updatePosition, createPosition, position, isLoadingPosition } = usePositions(id);
    const navigate = useNavigate();

    if (isLoadingPosition) return <Typography>Loading position...</Typography>

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(`Data${data}`);

        if (position) {
            data.id = position.id;
            await updatePosition.mutateAsync(data as unknown as Position);
            navigate(`positions/${position.id}`)
        } else {
            createPosition.mutateAsync(data as unknown as Position, {
                onSuccess: (id) => {
                    navigate(`/positions/${id}`)
                }
            });

        }
    }
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">{position ? 'Edit Position' : 'Create Position'}</Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField name="title" label='Title' defaultValue={position?.title} />
                <TextField name="description" label='Description' defaultValue={position?.description} multiline rows={3} />
                <TextField name="date" label='Date' defaultValue={new Date().toISOString().split('T')[0]} type='date' />
                <TextField name="city" label='City' defaultValue={position?.city} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={() => navigate(`/positions/`)} color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={updatePosition.isPending || createPosition.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}