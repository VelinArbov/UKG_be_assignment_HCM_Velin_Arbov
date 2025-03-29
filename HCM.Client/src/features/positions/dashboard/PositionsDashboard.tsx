import { Grid } from "@mui/material"
import PositionList from "./PositionList";
import PositionDetail from "../details/PositionDetail";
import PositionForm from "../form/PositionForm";

type Props = {
    positions: Position[];
    selectPosition: (id: string) => void;
    cancelPosition: () => void;
    selectedPosition?: Position;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
}

export default function PositionsDashboard({ positions, cancelPosition, selectPosition, selectedPosition, openForm, closeForm, editMode }: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <PositionList positions={positions} selectPosition={selectPosition} />
            </Grid>
            <Grid size={5}>
                {selectedPosition && !editMode && <PositionDetail
                    position={selectedPosition}
                    cancelPosition={cancelPosition}
                    openForm={openForm} />}
                {editMode &&
                    <PositionForm closeForm={closeForm} position={selectedPosition} />}
            </Grid>
        </Grid>
    )
}
