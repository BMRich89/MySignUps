
'use client'
import EventCard from "@/components/EventCard"
import PageWrapper from "@/components/PageWrapper"
import { Alert, Backdrop, Box, Button, CircularProgress, Container, Grid2, Snackbar, Tab, Tabs } from "@mui/material"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"
import { EventData } from "@/types/eventData"
import MyDialog from "@/components/MyDialog"
import { EventForm } from "@/components/forms/EventForm"
import React from "react"
import { State } from "../page"
import { SubmitHandler } from "react-hook-form"
import SignUpForm from "@/components/forms/SignUpForm"
import { SignUpData } from "@/types/signUps"
import { deleteEvent, viewEvent, updateEvent, submitSignUps } from "../utils/api"

export default function UpcomingEvents() {
  const [signUpReadonly, setSignUpReadonly] = useState(true);
  const [signUpTabs, setSignUpTabs] = useState(0);
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
      const data = await viewEvent(_id);
      setEventView(data);
      setOpenView(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: EventData) => {
    try {
      await updateEvent(data);
      refreshEvents();
      setOpenView(true);
      setToggleUpdate(false);
      setState({ ...state, open: true, message: 'Event updated successfully', severity: 'success' });
    } catch (error) {
      setState({ ...state, open: true, message: 'Error updating event', severity: 'error' });
    }
  };

  const onSubmitSignUps = async (data: SignUpData) => {
    try {
      await submitSignUps(data);
      setState({ ...state, open: true, message: 'Sign ups added successfully', severity: 'success' });
    } catch (error) {
      setState({ ...state, open: true, message: 'Error adding sign ups', severity: 'error' });
    }
  };


  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const tabs = <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={signUpTabs} onChange={(event: React.SyntheticEvent, newValue: number) => {
        setSignUpTabs(newValue);
      }} aria-label="basic tabs example">
        <Tab label="Event Info" disabled={signUpTabs === 0} {...a11yProps(0)} />
        <Tab label="Sign Ups" disabled={signUpTabs === 1} {...a11yProps(1)} onClick={() => setSignUpReadonly(true)}/>
      </Tabs>
    </Box>
  </Box>

  const viewEventDialog = () => {

    const actions = eventView && <Grid2 container columnSpacing={0} direction={'row'} sx={{ p: 2 }}>
      {!toggleUpdate && <>
        <Grid2 size={4}>
          <Button variant="contained" color="error" sx={{ width: "90%" }} onClick={() => deleteEventFetch(eventView._id)} disabled={false}>
            Delete Event
          </Button>
        </Grid2>
        <Grid2 size={4}>
          <Button variant="contained" color="info" sx={{ width: "90%" }} onClick={() => setToggleUpdate(true)} disabled={false}>
            Edit Event
          </Button>
        </Grid2>
        <Grid2 size={4}>
          <Button variant="contained" color="success" sx={{ width: "90%" }} onClick={() => { setSignUpReadonly(false); setSignUpTabs(1) }} disabled={false}>
            Add Sign Ups
          </Button>
        </Grid2>
      </>
      }
    </Grid2>

    const submit = toggleUpdate && eventView && <Grid2 size={12}>
      <Button variant="contained" color="info" sx={{ width: "100%" }} type="submit" disabled={false}>
        Update Event
      </Button>
    </Grid2>

    const onClose = () => {
      setToggleUpdate(false);
    }



    return eventView && <>
      <MyDialog title={eventView.name} open={openView} setOpen={(val) => setOpenView(val)} onClose={() => onClose()}>
        {tabs}
        {signUpTabs === 0 && <EventForm onSubmit={onSubmit} readonly={!toggleUpdate} existingEvent={eventView} submitButton={submit} actionButtons={actions} />}
        {signUpTabs === 1 && <SignUpForm readonly={signUpReadonly} readonlyUpdate={(val) => setSignUpReadonly(val)} eventId={eventView._id} onSubmit={onSubmitSignUps} />}
      </MyDialog>
    </>
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