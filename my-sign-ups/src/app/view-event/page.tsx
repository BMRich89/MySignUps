'use client'
import PageWrapper from "@/components/PageWrapper"
import { Alert, Box, Button, Container, InputLabel, Paper, Stack, TextField, Typography } from "@mui/material"
import router from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import CheckIcon from '@mui/icons-material/Check';
import { EventForm } from "@/components/forms/EventForm"
import MyDialog from "@/components/MyDialog"
import { EventData } from "@/types/eventData"


type Alert = {
    message: string,
    success: boolean
}

//TODO: Implement antiforgery

export default function ViewEvent({ eventObject }: { eventObject: EventData }) {

    const onSubmit = () => {

    }

    return <EventForm onSubmit={onSubmit} readonly={true} existingEvent={eventObject} />

}