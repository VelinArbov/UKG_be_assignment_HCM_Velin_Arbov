import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Position } from "../../../lib/types";
import { Link } from "react-router";
import { AccessTime } from "@mui/icons-material";

type Props = {
    position: Position;
}

export default function PositionCard({ position }: Props) {
    const isHost = false;
    const isApplied = false;
    const label = isHost ? 'You are created this position' : 'You can apply on this position';
    const isCancelled = false;
    const color = isHost ? 'secondary' : isApplied ? 'warning' : 'default';


    return (
        <Card sx={{ borderRadius: 3 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <CardHeader
                    avatar={<Avatar sx={{ height: 80, width: 80 }} />}
                    title={position.title}
                    titleTypographyProps={{
                        fontWeight: 'bold',
                        fontSize: 20
                    }}
                    subheader={
                        <>
                            Created by
                            <Link to={`/profiles`}>Test</Link>
                        </>
                    }
                />
                <Box display='flex' flexDirection='column' gap={2} mr={2}>
                    {(isHost || isApplied) && <Chip variant="outlined" label={label} color={color} sx={{ borderRadius: 2 }} />}
                    {isCancelled && <Chip label='Cancelled' color='error' sx={{ borderRadius: 2 }} />}
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <CardContent sx={{ p: 0 }}>
                <Box display='flex' alignItems='center' mb={2} px={2}>
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography variant="body2" noWrap>
                        {position.date}
                    </Typography>
                </Box>
                <Divider />

                <Box display='flex' gap={2} sx={{ backgroundColor: 'grey.200', py: 3, pl: 3 }}>
                    Appliers
                </Box>
            </CardContent>

            <CardContent sx={{ pb: 2 }}>
                <Typography variant="body2">
                    {position.description}
                </Typography>
                <Button
                    component={Link}
                    to={`/positions/${position.id}`}
                    size="medium"
                    variant="contained"
                    sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
                >
                    View
                </Button>
            </CardContent>
        </Card>
    )
}