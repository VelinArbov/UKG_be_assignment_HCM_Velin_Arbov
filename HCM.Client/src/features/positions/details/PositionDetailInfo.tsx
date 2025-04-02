import { Info, CalendarToday, Place } from "@mui/icons-material"
import { Divider, Grid, Paper, Typography } from "@mui/material"
import { Position } from "../../../lib/types"

type Props = {
    position: Position
}
export default function PositionDetailsInfo({ position }: Props) {
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
                    <Typography>{(position.date)}</Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Place color="info" fontSize="large" />
                </Grid>

            </Grid>
        </Paper>
    )
}

