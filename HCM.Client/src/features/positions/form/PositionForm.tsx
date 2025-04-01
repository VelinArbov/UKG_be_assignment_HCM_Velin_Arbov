import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { usePositions } from "../../../lib/hooks/usePositions";
import { Position } from "../../../lib/types";



export default function PositionForm() {

    const { updatePosition, createPosition } = usePositions();
    const position = {} as Position;
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (position) {
            data.id = position.id;
            await updatePosition.mutateAsync(data as unknown as Position)
        } else {
            await createPosition.mutateAsync(data as unknown as Position);
        }

    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">Add Position</Typography>
            <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
                <TextField label='Title' defaultValue={position?.title} />
                <TextField label='Description' defaultValue={position?.description} multiline rows={3} />
                <TextField label='Date' defaultValue={position?.date} type='date' />
                <TextField label='City' defaultValue={position?.city} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color="inherit">Cancel</Button>
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