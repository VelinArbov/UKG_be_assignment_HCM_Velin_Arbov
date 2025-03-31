import { Grid } from "@mui/material"
import PositionList from "./PositionList";
import PositionDetail from "../details/PositionDetail";
import PositionForm from "../form/PositionForm";


export default function PositionsDashboard() {
  const { positions, isPending } = usePositions();

  if(!positions || isPending)

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
