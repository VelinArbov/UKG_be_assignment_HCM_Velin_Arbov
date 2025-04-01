import { Grid } from "@mui/material"
import PositionList from "./PositionList";

export default function PositionsDashboard() {


    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <PositionList />
            </Grid>
            <Grid size={5}>
                Positions filter go here
            </Grid>
        </Grid>
    )
}
