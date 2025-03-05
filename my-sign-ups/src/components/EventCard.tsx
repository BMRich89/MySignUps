'use client'
import { Card, CardContent, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
type EventCardProps = {
    EventName: string,
    EventDate: Date
}

export default function EventCard({ EventName, EventDate }: EventCardProps) {
    const card = <CardContent >
        <Typography variant="h5" component="div">
           {EventName}
        </Typography>
        <Typography sx={{ color: 'gray', mb: 1.5 }}>{EventDate.toString()}</Typography>
            
    
    </CardContent>
    const theme = useTheme();
    return <Card color="secondary" sx={{bgcolor:theme.palette.secondary.main, color:"#FFF", mb:5}}>
        {card}
    </Card>
}