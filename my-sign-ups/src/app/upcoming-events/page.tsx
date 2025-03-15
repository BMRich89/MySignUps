
'use client'
import EventCard from "@/components/EventCard"
import PageWrapper from "@/components/PageWrapper"
import { Backdrop, Button, Card, CircularProgress, Container, Dialog, DialogActions, Grid2, Skeleton, Typography } from "@mui/material"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ViewEvent from "../view-event/page"
import { EventData } from "@/types/eventData"
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventView, setEventView] = useState<EventData | null>(null);
  const [openView, setOpenView] = useState(false);
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
  function viewEvent(_id: any): void {
    fetch(`/api/events?id=${_id}`, {
      method: "GET",
    }).then((response) => response.json())
      .then((data) => {
        setEventView(data);
        setOpenView(true);
      });
  }

  function editEvent(_id: ObjectId): void {
    throw new Error("Function not implemented.")
  }

  const viewEventDialog = () => eventView && <Dialog title="View Event" open={openView}>
    <Grid2 container>
      <Grid2 size={10}>
        <Typography variant="h4" margin={2}>{eventView.name}</Typography>
      </Grid2>
      <Grid2>
        <DialogActions>
          <Button
            sx={{ color: "secondary.main", ":hover": { color: "secondary.dark" } }}
            onClick={() => setOpenView(false)}>
            <DisabledByDefaultIcon fontSize="large" />
          </Button>
        </DialogActions>
      </Grid2>
    </Grid2>

    <ViewEvent eventObject={eventView} />
  </Dialog>

  return <PageWrapper title="Upcoming Events">
    <Container>
      {events.map((ev) => (
        <EventCard
          key={`${ev._id}`}
          EventData={ev}
          viewCallback={() => viewEvent(ev._id)}
          editCallback={() => editEvent(ev._id)}
          deleteCallback={() => deleteEvent(ev._id)}
        />
      ))}
      {viewEventDialog()}
    </Container>
  </PageWrapper>


}