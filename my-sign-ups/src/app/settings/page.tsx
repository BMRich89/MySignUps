'use client'

import CreateEventTypeDialog from "@/components/CreateEventType"
import PageWrapper from "@/components/PageWrapper"
import { Button, Dialog } from "@mui/material"

export default function Settings(){


    return <PageWrapper title="Settings">
        <CreateEventTypeDialog open={false} selectedValue={""} onClose={function (value: string): void {
            throw new Error("Function not implemented.")
        } }/>
        </PageWrapper>

}