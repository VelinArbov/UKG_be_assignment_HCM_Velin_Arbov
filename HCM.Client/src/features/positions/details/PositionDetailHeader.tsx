import { Box, Card, CardMedia, Chip, Typography } from "@mui/material";
// import { usePositions } from "../../../lib/hooks/usePositions";
import { Position } from "../../../lib/types";

type Props = {
    position: Position
}

export default function ActivityDetailsHeader({ position }: Props) {
    // const { updatePosition } = usePositions(position.id);

    return (
        <Card sx={{ position: 'relative', mb: 2, backgroundColor: 'transparent', overflow: 'hidden' }}>
            {position.isCancelled && (
                <Chip
                    sx={{
                        position: 'absolute', left: 40, top: 20,
                        zIndex: 1000, borderRadius: 1
                    }}
                    color="error"
                    label="Cancelled"
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/${position.category}.jpg`}
                alt={`${position.category} image`}
            />
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)',
                boxSizing: 'border-box',
            }}>
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{position.title}</Typography>
                    <Typography variant="subtitle1">{(position.date)}</Typography>
                    <Typography variant="subtitle2">
                        Test

                    </Typography>
                </Box>

                {/* Buttons aligned to the right */}
                {/* <Box sx={{ display: 'flex', gap: 2 }}> */}
                {/* {activity.isHost ? (
                    <>
                        <StyledButton
                            variant='contained'
                            color={activity.isCancelled ? 'success' : 'error'}
                            onClick={() => updateAttendance.mutate(activity.id)}
                            disabled={updateAttendance.isPending}
                        >
                            {activity.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={`/manage/${activity.id}`}
                            disabled={activity.isCancelled}
                        >
                            Manage Event
                        </StyledButton>
                    </>
                ) : (
                    <StyledButton
                        variant="contained"
                        color={activity.isGoing ? 'primary' : 'info'}
                        onClick={() => updateAttendance.mutate(activity.id)}
                        disabled={updateAttendance.isPending || activity.isCancelled}
                    >
                        {activity.isGoing ? 'Cancel Attendance' : 'Join Activity'}
                    </StyledButton> */}
                {/* )} */}
                {/* </Box> */}
            </Box>
        </Card>
    )
}