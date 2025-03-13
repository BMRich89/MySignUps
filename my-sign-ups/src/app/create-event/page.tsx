'use client'
import PageWrapper from "@/components/PageWrapper"
import { Alert, Box, Button, Container, InputLabel, Paper, Stack, TextField } from "@mui/material"
import router from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import CheckIcon from '@mui/icons-material/Check';
import { EventForm } from "@/components/forms/EventForm"
import { EventData } from "@/types/eventData"


type Alert = {
    message: string,
    success: boolean
}

//TODO: Implement antiforgery

export default function CreateEvent( ) {
    const [alert, setAlert] = useState<Alert | null>(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EventData>()

    const onSubmit: SubmitHandler<EventData> = (data: EventData) => {
        fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                setAlert({ message: "Event created successfully", success: true })
            } else {
                // Handle error
                setAlert({ message: "Event creation failed", success: false })
            }
        })
            .catch(error => {
                // Handle network error
                console.error('Network error:', error)
            });

    }

    return <PageWrapper title="Create Event">
        <Container >
            <EventForm onSubmit={onSubmit} readonly={false} existingEvent={null} />
            <Box sx={{ "width": "100%" }}>
                {alert && <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" sx={{ "marginTop": "1rem" }} severity={alert && alert.success ? "success" : "error"}>{alert.message}</Alert>}
            </Box>
        </Container>
    </PageWrapper>
}