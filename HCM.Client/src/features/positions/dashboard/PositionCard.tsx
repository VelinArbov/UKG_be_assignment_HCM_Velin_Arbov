import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { usePositions } from "../../../lib/hooks/usePositions";
import { Position } from "../../../lib/types";

type Props = {
    position: Position;
}

export default function PositionCard({ position }: Props) {
    const { deletePosition } = usePositions();

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{position.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{position.title}</Typography>
                <Typography variant="body2">{position.description}</Typography>
                <Typography variant="subtitle1">{position.city}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={position.category} variant="outlined" />
                <Box display='flex' gap={3}>
                    <Button onClick={() => { }} size="medium" variant="contained">View</Button>
                    <Button onClick={() => deletePosition.mutate(position.id)} 
                    disabled={deletePosition.isPending} 
                    size="medium" 
                    color="error" 
                    variant="contained">Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}