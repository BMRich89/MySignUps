'use client'
import SettingsIcon from '@mui/icons-material/Settings';
import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCardIcon from '@mui/icons-material/AddCard';
import PageWrapper from "@/components/PageWrapper";
import { Alert, Button, Container, Grid2, Snackbar, SnackbarOrigin } from "@mui/material";
import MyDialog from '@/components/MyDialog';
import { EventForm } from '@/components/forms/EventForm';
import { SubmitHandler } from 'react-hook-form';
import { EventData } from '@/types/eventData';
import React from 'react';

export interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export default function Home() {
  const [openCreateEvent, setCreateEvent] = React.useState(false);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: '',
    severity: 'info'
  });
  const { vertical, horizontal, open, message, severity } = state;

  const handleClick = (newState: State) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onSubmit: SubmitHandler<EventData> = (data: EventData) => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    }).then(response => {
      if (response.ok) {
        setCreateEvent(false);
        setState({ ...state, open: true, message: 'Event created successfully', severity: 'success' });
      } else {
        // Handle error
        setCreateEvent(false);
        setState({ ...state, open: true, message: 'Error creating event', severity: 'error' });
      }
    })
      .catch(error => {
        // Handle network error
        console.error('Network error:', error)
      });

  }

  const buttons = <Button variant="contained" type="submit" color="success" sx={{ width: "100%" }}>
  Add Event
</Button>

  return (
    <Container>

      <PageWrapper title="My Sign Ups">
        <Grid2 spacing={2} container sx={{height:'15vw', width:'100vw'}}>
          <Grid2 size={4} >
            <LinkButton title={'Create Event'} icon={<AddCardIcon sx={{fontSize:'5rem'}}/>} clickHandler={() => setCreateEvent(true)}/>
          </Grid2>
          <Grid2 size={4}  >
          <LinkButton link="/upcoming-events" title={'Upcoming Events'} icon={<CalendarMonthIcon sx={{fontSize:'5rem'}}/>} component="a"/>
          </Grid2>
          <Grid2 size={4}>
            <LinkButton link="/settings" title={'Settings'} icon={<SettingsIcon  sx={{fontSize:'5rem'}}/>} component="a"/>
          </Grid2>
        </Grid2>
        
        <MyDialog open={openCreateEvent} setOpen={setCreateEvent} title="Create Event" onClose={()=>{}}>
          <EventForm onSubmit={onSubmit} readonly={false} existingEvent={null} submitButton={buttons}/>
        </MyDialog>
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
      </PageWrapper>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </Container>
  );
}
function setState(arg0: { open: boolean; vertical: "top" | "bottom"; horizontal: "left" | "center" | "right"; }) {
  throw new Error('Function not implemented.');
}

