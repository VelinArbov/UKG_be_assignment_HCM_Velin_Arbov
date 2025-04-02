import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { usePositions } from "../../../lib/hooks/usePositions";
import { useParams } from "react-router";
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from "react";
import { positionSchema, PositionSchema } from "../../../lib/schemas/positionSchema";
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";



export default function PositionForm() {

    const { register, reset, control, handleSubmit } = useForm<PositionSchema>({
        mode: 'onTouched',
        resolver: zodResolver(positionSchema)
    });
    const { id } = useParams();
    const { updatePosition, createPosition, position, isLoadingPosition } = usePositions(id);
    useEffect(() => {
        if (position) reset(position)
    }, [position, reset])


    const OnSubmit = (data: FieldValues) => {
        console.log(data);
    }

    if (isLoadingPosition) return <Typography>Loading position...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">{position ? 'Edit Position' : 'Create Position'}</Typography>
            <Box component='form' onSubmit={handleSubmit(OnSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description'
                    multiline rows={3} />
                <SelectInput items={categoryOptions} label='Category' name='category' />
                <TextField {...register('city')} label='City' defaultValue={position?.city} />
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
