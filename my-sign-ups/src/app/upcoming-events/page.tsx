
'use client'
import EventCard from "@/components/EventCard"
import PageWrapper from "@/components/PageWrapper"
import { Alert, Backdrop, Button, CircularProgress, Container, Grid2, Snackbar } from "@mui/material"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"
import { EventData } from "@/types/eventData"
import MyDialog from "@/components/MyDialog"
import { EventForm } from "@/components/forms/EventForm"
import { ObjectEncodingOptions } from "fs"
import React from "react"
import { State } from "../page"

export default function UpcomingEvents() {
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventView, setEventView] = useState<EventData | null>(null);
  const [openView, setOpenView] = useState(false);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'info'
  });

  const { vertical, horizontal, open, message, severity } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

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


  const deleteEventFetch = (id: any) => {
    fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    }).then((response) => {
      if (response.ok) {
        setEvents(events.filter((ev) => ev._id !== id)); //TODO probably should refetch rather than filtering out
        setOpenView(false);
        setState({ ...state, open: true, message: 'Event deleted successfully', severity: 'success' });
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
  function viewEventFetch(_id: ObjectId): void {
    fetch(`/api/events?id=${_id}`, {
      method: "GET",
    }).then((response) => response.json())
      .then((data) => {
        setEventView(data);
        setOpenView(true);
      });
  }

  function editEventFetch(_id: ObjectId): void {
    setToggleUpdate(false);
  }

  


  const viewEventDialog = () => {

    const buttons = eventView && <Grid2 container columnSpacing={0} direction={'row-reverse'} sx={{ p: 2 }}>
      { !toggleUpdate ? <Grid2 size={6}>
        <Button variant="contained" color="info" sx={{ width: "100%" }} onClick={() => setToggleUpdate(true)} disabled={false}>
          Edit Event
        </Button>
      </Grid2> : <Grid2 size={12}>
        <Button variant="contained" color="info" sx={{ width: "100%" }} onClick={() => editEventFetch(eventView._id)} disabled={false}>
          Update Event
        </Button>
      </Grid2>
      }
      { !toggleUpdate && <Grid2 size={6}>
        <Button variant="contained" color="error" sx={{ width: "90%" }} onClick={() => deleteEventFetch(eventView._id)} disabled={false}>
          Delete Event
        </Button>
      </Grid2>}
    </Grid2>

      const onClose = () => {
        setToggleUpdate(false);
      }

    return eventView && <MyDialog title={eventView.name} open={openView} setOpen={(val) => setOpenView(val)} onClose={() => onClose()}>
      <EventForm onSubmit={() => { }} readonly={true} existingEvent={eventView} actionButtons={buttons}/>
    </MyDialog>
  }

  return <>
    <PageWrapper title="Upcoming Events">
      <Container sx={{ width: '100%', textAlign: 'center' }}>
        {events.map((ev) => (
          <EventCard
            key={`${ev._id}`}
            EventData={ev}
            viewCallback={() => viewEventFetch(ev._id)}
            deleteCallback={() => deleteEventFetch(ev._id)}
          />
        ))}
        {viewEventDialog()}
      </Container>
    </PageWrapper>

    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      sx={{ color: 'primary.main' }}>
      <Alert
        onClose={handleClose}
        severity={state.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >{state.message}</Alert>
    </Snackbar>
  </>


}