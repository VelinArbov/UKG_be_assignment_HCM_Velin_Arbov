import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { usePositions } from "../../../lib/hooks/usePositions";
import { useNavigate, useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { positionSchema, PositionSchema } from "../../../lib/schemas/positionSchema";
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";



export default function PositionForm() {

    const { register, reset, control, handleSubmit } = useForm<PositionSchema>({
        mode: 'onTouched',
        resolver: zodResolver(positionSchema)
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const { updatePosition, createPosition, position, isLoadingPosition } = usePositions(id);
    useEffect(() => {
        if (position) reset(position)
    }, [position, reset])


    const OnSubmit = (data: PositionSchema) => {

        if (position) {
            updatePosition.mutate({ ...position, ...data }, {
                onSuccess: () => navigate(`/positions/${position.id}`)
            })
        }
        else {
            createPosition.mutate(data, {
                onSuccess: (x) => navigate(`/positions/${x}`)
            })
        }
    }

    if (isLoadingPosition) return <Typography>Loading position...</Typography>

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">{position ? 'Edit Position' : 'Create Position'}</Typography>
            <Box component='form' onSubmit={handleSubmit(OnSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextInput label='Title' control={control} name='title' />
                <TextInput label='Description' control={control} name='description'
                    multiline rows={3} />
                <SelectInput items={categoryOptions} label='Category' name='category' control={control} />
                <TextField {...register('city')} label='City' defaultValue={position?.city} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button onClick={() => navigate(`/positions/${position ? id : ''}`)} color="inherit">Cancel</Button>
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
