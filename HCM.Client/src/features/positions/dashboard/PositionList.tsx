import { Box, Typography } from "@mui/material";
import PositionCard from "./PositionCard";
import { usePositions } from "../../../lib/hooks/usePositions";

export default function PositionList() {

    const { positions, isPending } = usePositions();

    if (!positions || isPending) return <Typography>Loading...</Typography>

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {positions.map(position => (
                <PositionCard key={position.id} position={position} />
            ))}
        </Box>
    )
}
