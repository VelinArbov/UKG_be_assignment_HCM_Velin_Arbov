import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { usePositions } from "../../../lib/hooks/usePositions";

type Props = {
    closeForm: () => void;
    position?: Position;
}

export default function PositionForm({ closeForm, position }: Props) {
    const { updatePosition } = usePositions();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (position) {
            data.id = position.id;
            await updatePosition.mutateAsync(data as unknown as Position)
            closeForm();
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
                    <Button onClick={closeForm} color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={updatePosition.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}