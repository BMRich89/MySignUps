'use client'
import ConvertToTitleCase from "@/app/utils/stringUtil";
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PreviewIcon from '@mui/icons-material/Preview';
import { EventData } from "@/types/eventData";
import { MoreVert } from "@mui/icons-material";
type EventCardProps = {
    EventData: EventData,
    deleteCallback: () => void,
    viewCallback: () => void
}

export default function EventCard({ EventData, viewCallback, deleteCallback }: EventCardProps) {
    return <Button component="div" onClick={() => viewCallback()} aria-label="view">
        <Card sx={{ mb: 5, width: '15rem', bgcolor: "primary.main", color: 'primary.dark.500', ":hover": { bgcolor: "primary.dark" } }}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "end" }}>
                <Button onClick={() => deleteCallback()} aria-label="view">
                    <DeleteForeverTwoToneIcon color="error" sx={{ fontSize: "2rem" }} />
                </Button>
            </Box>
            <CardContent >
                <Typography variant="h5" component="p" sx={{ textAlign: "center" }}>
                    {ConvertToTitleCase(EventData.name)}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "center", mb: 1.5 }}>
                    {EventData && EventData.date.toString()}
                </Typography>
            </CardContent>
        </Card>
    </Button>
}