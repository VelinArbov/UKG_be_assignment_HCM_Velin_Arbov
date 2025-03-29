import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
    position: Position;
    cancelPosition: () => void;
    openForm: (id: string) => void;
}

export default function PositionDetail({ position, cancelPosition, openForm }: Props) {
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia component='img' src={`/images/categoryImages/${position.category}.jpg`} />
            <CardContent>
                <Typography variant="h5">{position.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{position.date}</Typography>
                <Typography variant="body1">{position.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => openForm(position.id)} color="primary">Edit</Button>
                <Button onClick={cancelPosition} color="inherit">Cancel</Button>
            </CardActions>
        </Card>
    )
}
