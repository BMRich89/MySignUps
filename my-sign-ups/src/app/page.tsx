'use client'
import SettingsIcon from '@mui/icons-material/Settings';
import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddCardIcon from '@mui/icons-material/AddCard';
import PageWrapper from "@/components/PageWrapper";
import { Container, Typography } from "@mui/material";


export default function Home() {
  
  return (
    <Container>
    <PageWrapper title="My Sign Ups">
          <LinkButton link="/create-event">
            <AddCardIcon/>
            <Typography variant="h6">Create Event</Typography>
          </LinkButton>
          <LinkButton link="/upcoming-events">
            <CalendarMonthIcon/>
            <Typography variant="h6">Upcoming Events</Typography>
          </LinkButton>
          <LinkButton link="/settings">
            <SettingsIcon/>
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
    </Container>
  );
}
