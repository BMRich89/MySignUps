'use client'
import ConvertToTitleCase from "@/app/utils/stringUtil";
import { Card, CardContent, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
type EventCardProps = {
    EventName: string,
    EventDate: Date
}

export default function EventCard({ EventName, EventDate }: EventCardProps) {
    const card = <CardContent >
        <Typography variant="h5" component="p" sx={{textAlign:"center"}}>
           {ConvertToTitleCase(EventName)}
        </Typography>
        <Typography variant="h6" sx={{ textAlign:"center", mb: 1.5 }}>{EventDate.toString()}</Typography>
            
    
    </CardContent>
    const theme = useTheme();
    return <Card  sx={{ mb:5}}>
        {card}
    </Card>
}