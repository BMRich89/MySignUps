
'use client'
import EventCard from "@/components/EventCard"
import PageWrapper from "@/components/PageWrapper"
import { Backdrop, Button, Card, CircularProgress, Container, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type EventInfo =  {
    eventName:string,
    eventDate: Date
}


export default function UpcomingEvents(){


    const [events,setEvents] = useState<EventInfo[]>([]);
  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      fetch("/api/events", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((ev) => {
          setEvents(ev);
          setLoading(false);
        });
    }, []);

    if (loading) {
      return <PageWrapper title="Upcoming Events">
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      </PageWrapper>
    }
return <PageWrapper title="Upcoming Events"> 
              {events.map((ev) => (
                <EventCard key={`${ev.eventName}_${ev.eventDate}`} EventName={ev.eventName} EventDate={ev.eventDate} />
              ))}
        </PageWrapper>

    
}