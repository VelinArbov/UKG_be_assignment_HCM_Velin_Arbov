import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";

type Props = {
    closeForm: () => void;
    position?: Position;
    submitForm: (postion: Position) => void;
}

export default function PositionForm({ closeForm, position, submitForm }: Props) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: { [key: string]: FormDataEntryValue } = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (position) data.id === position.id

        submitForm(data as unknown as Position)
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
                    <Button type="submit" color="success" variant="contained">Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}