import { Grid } from "@mui/material";
import { usePositions } from "../../../lib/hooks/usePositions";
import PositionDetailHeader from "./PositionDetailHeader";
import PositionDetailInfo from "./PositionDetailInfo";
import PositionDetailSidebar from "./PositionDetailSidebar";
import * as material from "@mui/material"
import { useParams } from "react-router";



export default function ActivityDetailPage() {
    const { id } = useParams();
    const { position, isLoadingPosition } = usePositions(id);

    if (isLoadingPosition) return <material.Typography>Loading...</material.Typography>

    if (!position) return <material.Typography>Activity not found</material.Typography>

    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <PositionDetailHeader position={position} />
                <PositionDetailInfo position={position} />
            </Grid>
            <Grid size={4}>
                <PositionDetailSidebar />
            </Grid>
        </Grid>
    )
}