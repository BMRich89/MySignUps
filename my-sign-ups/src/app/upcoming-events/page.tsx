
'use client'
import EventCard from "@/components/EventCard"
import PageWrapper from "@/components/PageWrapper"
import { Alert, Backdrop, CircularProgress, Container, Snackbar } from "@mui/material"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"
import { EventData } from "@/types/eventData"
import React from "react"
import { State } from "../page"
import { deleteEvent, viewEvent } from "../utils/api"
import EventView from "@/components/eventView"

export default function UpcomingEvents() {
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

  const updateToaster = (openState:boolean, msg:string, severity:'success'|'error') => {
    setState({...state, open: openState, message: msg, severity: severity })
  }


  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    setLoading(true);
    refreshEvents();
  }, []);

  const refreshEvents = () => {
    fetch("/api/events", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((ev) => {
      setEvents(ev);
      setLoading(false);
    });
  }


  const deleteEventFetch = async (id: ObjectId) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter((ev) => ev._id !== id)); 
      setOpenView(false);
      setState({ ...state, open: true, message: 'Event deleted successfully', severity: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  
  if (loading) {
    return <PageWrapper title="Upcoming Events">
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </PageWrapper>
  }
  const viewEventFetch = async (_id: ObjectId) => {
    try {
      console.log(_id)
      const data = await viewEvent(_id);
      setEventView(data);
      setOpenView(true);
    } catch (error) {
      console.error(error);
    }
  };

  
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
        {eventView && 
        <EventView 
        eventData={eventView} 
        refreshEvents={() => refreshEvents()}
        openDialog={openView} 
        setOpenDialog={setOpenView}
        showToaster={state}
        setShowToaster={(open:boolean,msg:string, severity:'success'|'error') => updateToaster(open,msg,severity) }/>
        } 
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