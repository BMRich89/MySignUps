'use client'
import CalendarSVG from "@/components/CalendarSVG";
import CreateEventSVG from "@/components/CreateEventSVG";
import GearSVG from "@/components/GearSVG";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';
import PageWrapper from "@/components/PageWrapper";
import { Typography } from "@mui/material";


export default function Home() {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: cyan[500],
      },
      secondary: {
        main: '#36454F',
      },
    },
  });
  



  return (
    <>
    <PageWrapper title="My Sign Ups">
          <LinkButton link="/create-event">
            <CreateEventSVG/>
            <Typography variant="h6">Create Event</Typography>
          </LinkButton>
          <LinkButton link="/upcoming-events">
            <CalendarSVG/>
            <Typography variant="h6">Upcoming Events</Typography>
          </LinkButton>
          <LinkButton link="/settings">
            <GearSVG/>
            <Typography variant="h6">Settings</Typography>
          </LinkButton>
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
    </>
  );
}
