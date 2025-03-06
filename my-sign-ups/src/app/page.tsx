'use client'
import CalendarSVG from "@/components/CalendarSVG";
import CreateEventSVG from "@/components/CreateEventSVG";
import GearSVG from "@/components/GearSVG";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cyan, purple } from '@mui/material/colors';


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
    <ThemeProvider theme={theme}>
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2  sm:items-start">
        <div className="rounded-full bg-gray-500/25 p-5">
          <h1 className="text-4xl">My Sign Ups</h1>
        </div>
          <LinkButton link="/create-event">
            <CreateEventSVG/>
            <span>Create Event</span>
          </LinkButton>
          <LinkButton link="/upcoming-events">
            <CalendarSVG/>
            <span>Upcoming Events</span>
          </LinkButton>
          <LinkButton link="/settings">
            <GearSVG/>
            <span>Settings</span>
          </LinkButton>
      </main>
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
    </div>
    </ThemeProvider>
  );
}
