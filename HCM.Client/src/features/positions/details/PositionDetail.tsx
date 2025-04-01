import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { usePositions } from "../../../lib/hooks/usePositions";
import { Position } from "../../../lib/types";

type Props = {
    selectedPosition: Position;
    cancelPosition: () => void;
    openForm: (id: string) => void;
}

export default function PositionDetail({ selectedPosition, cancelPosition, openForm }: Props) {
    const { positions } = usePositions();
    const position = positions?.find(x => x.id === selectedPosition.id);
    if (position)

        return (
            <Card sx={{ borderRadius: 3 }}>
                <CardMedia component='img' src={`/images/categoryImages/${selectedPosition.category}.jpg`} />
                <CardContent>
                    <Typography variant="h5">{selectedPosition.title}</Typography>
                    <Typography variant="subtitle1" fontWeight='light'>{selectedPosition.date}</Typography>
                    <Typography variant="body1">{selectedPosition.description}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => openForm(selectedPosition.id)} color="primary">Edit</Button>
                    <Button onClick={cancelPosition} color="inherit">Cancel</Button>
                </CardActions>
            </Card>
        )
}
