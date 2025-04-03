import { Info, CalendarToday, Place } from "@mui/icons-material"
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material"
import { Position } from "../../../lib/types"
import { useNavigate } from "react-router"

type Props = {
    position: Position
}
export default function PositionDetailsInfo({ position }: Props) {
    const navigate = useNavigate();

    return (
        <Paper sx={{ mb: 2 }}>
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{position.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{(position.date.toString())}</Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Place color="info" fontSize="large"></Place>
                </Grid>
                <Grid size={11}>
                    <Typography>{(position.city)}</Typography>
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" p={1}>
                <Button
                    variant="outlined"
                    onClick={() => navigate(`/edit/${position.id}`)}
                >
                    Edit
                </Button>
            </Box>
        </Paper>
    )
}

