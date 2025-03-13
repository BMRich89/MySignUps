'use client'
import ConvertToTitleCase from "@/app/utils/stringUtil";
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PreviewIcon from '@mui/icons-material/Preview';
import { EventData } from "@/types/eventData";
type EventCardProps = {
    EventData: EventData,
    deleteCallback: () => void,
    editCallback: () => void,
    viewCallback: () => void
}

export default function EventCard({ EventData, viewCallback, editCallback, deleteCallback }: EventCardProps) {




    
    return <Card sx={{ mb: 5, pt: 2 }}>
        <CardContent >
            <Typography variant="h5" component="p" sx={{ textAlign: "center" }}>
                { ConvertToTitleCase(EventData.name)}
            </Typography>
            { <Typography variant="h6" sx={{ textAlign: "center", mb: 1.5 }}>{EventData && EventData.date.toString()}</Typography> }

            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "end" }}>
                <Button onClick={() => viewCallback()} aria-label="view">
                    <PreviewIcon color="warning" sx={{ fontSize: "40px" }} />
                </Button>
                <Button onClick={() => editCallback()} aria-label="edit">
                    <EditCalendarIcon color="warning" sx={{ fontSize: "40px" }} />
                </Button>

                <Button onClick={() => deleteCallback()} aria-label="delete">
                    <DeleteForeverTwoToneIcon color="warning" sx={{ fontSize: "40px" }} />
                </Button>
            </Box>
        </CardContent>
    </Card>
}