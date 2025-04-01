import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router";
import { usePositions } from "../../../lib/hooks/usePositions";

export default function PositionDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { position, isLoadingPosition } = usePositions(id);

    console.log(position)
    if (isLoadingPosition) return <Typography>Loading...</Typography>

    if (!position) return <Typography>Position not found</Typography>

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia component='img' src={`/images/categoryImages/${position.category}.jpg`} />
            <CardContent>
                <Typography variant="h5">{position.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>{position.date}</Typography>
                <Typography variant="body1">{position.description}</Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/edit/${position.id}`} color="primary">Edit</Button>
                <Button onClick={() => navigate('/positions')} color="inherit">Cancel</Button>
            </CardActions>
        </Card>
    )
}
