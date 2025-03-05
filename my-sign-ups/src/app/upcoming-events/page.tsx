
'use client'
import EventCard from "@/components/EventCard"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type EventInfo =  {
    eventName:string,
    eventDate: Date
}


export default function UpcomingEvents(){


      const [events,setEvents] = useState<EventInfo[]>([]);

  useEffect(() => {
      fetch("/api/events", {
        method: "GET",
    }).then((res) => res.json()).then((ev) => {setEvents(ev)});    
   
  }, [])
  
    
return     <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2  sm:items-start">
            <div className="rounded-full bg-gray-500/25 p-5">
              <h1 className="text-4xl">Create Event</h1>
            </div>
            <div className="flex flex-col">
            {
                events.map((ev) => <EventCard EventName={ev.eventName} EventDate={ev.eventDate}/>)
            }
            </div>
          </main>
        </div>
    
}