import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"

type Props = {
    position: Position;
    selectPosition: (id: string) => void;

}
export default function PositionCard({ position, selectPosition }: Props) {
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
                <Button onClick={() => selectPosition(position.id)} size="medium" variant="contained">View</Button>
            </CardActions>
        </Card>
    )
}