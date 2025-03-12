
'use client'
import EventCard from "@/components/EventCard"
import PageWrapper from "@/components/PageWrapper"
import { Backdrop, Button, Card, CircularProgress, Container, Skeleton } from "@mui/material"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type EventInfo = {
  eventName: string,
  eventDate: Date,
  _id: ObjectId
}


export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventInfo[]>([]);
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


  const deleteEvent = (id: any) => {
    fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    }).then((response) => {
      if (response.ok) {
        setEvents(events.filter((ev) => ev._id !== id));
      }
    });
  }

  if (loading) {
    return <PageWrapper title="Upcoming Events">
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </PageWrapper>
  }
  function viewEvent(_id: ObjectId): void {
    throw new Error("Function not implemented.")
  }

  function editEvent(_id: ObjectId): void {
    throw new Error("Function not implemented.")
  }

  return <PageWrapper title="Upcoming Events">
    <Container>
      {events.map((ev) => (
        <EventCard
          key={`${ev._id}`}
          EventName={ev.eventName}
          EventDate={ev.eventDate}
          viewCallback={() => viewEvent(ev._id)}
          editCallback={() => editEvent(ev._id)}
          deleteCallback={() => deleteEvent(ev._id)}
        />
      ))}
    </Container>
  </PageWrapper>


}