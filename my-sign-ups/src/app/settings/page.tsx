'use client'

import CreateEventType from "@/components/CreateEventType"
import PageWrapper from "@/components/PageWrapper"
import { Button, Dialog } from "@mui/material"

export default function Settings(){


    return <PageWrapper title="Settings">
        <Button variant="contained" className="w-full h-10 bg-green-500/10 hover:bg-green-500/50 cursor-pointer">
            Add Event Types
        </Button>
        <CreateEventType/>
        </PageWrapper>

}