'use client'

import CreateEventType from "@/components/CreateEventType"
import { Button, Dialog } from "@mui/material"

export default function Settings(){


    return <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2  sm:items-start">
      <div className="rounded-full bg-gray-500/25 p-5">
        <h1 className="text-4xl">Settings</h1>
      </div>
      <div className="flex flex-col">
        <Button variant="contained" className="w-full h-10 bg-green-500/10 hover:bg-green-500/50 cursor-pointer">
            Add Event Types
        </Button>
        <CreateEventType/>
      </div>
    </main>
  </div>
}