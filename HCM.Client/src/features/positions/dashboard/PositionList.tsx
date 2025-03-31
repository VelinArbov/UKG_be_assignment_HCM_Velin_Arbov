import { Box } from "@mui/material";
import PositionCard from "./PositionCard";

type Props = {
    positions: Position[];
    selectPosition: (id: string) => void;
    deletePosition: (id: string) => void;
}
export default function PositionList({ positions, selectPosition, deletePosition }: Props) {
    console.log(positions)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {positions.map(position => (
                <PositionCard key={position.id} position={position} selectPosition={selectPosition} deletePosition={deletePosition} />
            ))}
        </Box>
    )
}
