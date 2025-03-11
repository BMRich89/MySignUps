'use client'
import PageWrapper from "@/components/PageWrapper"
import { Alert, Box, Button, Container, InputLabel, Stack, TextField } from "@mui/material"
import router from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import CheckIcon from '@mui/icons-material/Check';


type Inputs =  {
    eventName:string,
    eventDate: Date
}

type Alert = {
    message: string,
    success: boolean
}

//TODO: Implement antiforgery

export default function CreateEvent(){
    const [alert,setAlert] = useState<Alert|null>(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data:Inputs) => {
        fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                setAlert({message: "Event created successfully", success: true})
            } else {
                // Handle error
                setAlert({message: "Event creation failed", success: false})
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Network error:', error)
        });
        
    }
    
return     <PageWrapper title="Create Event">
                <Container>
                <Box sx={{bgcolor: 'primary.main', 'padding': '1rem'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex m-3">
                        <InputLabel className="w-3/6">Event Name</InputLabel>
                        <TextField  className="w-3/6 bg-white text-gray-800 rounded-lg px-2" required placeholder="Event Name" {...register("eventName")}/>
                    </div>
                    <div className="flex m-3">
                        <InputLabel className="w-3/6">Event Date</InputLabel>
                        <TextField  type="date" required className="w-3/6 bg-white text-gray-800 rounded-lg px-2" placeholder="Event Date" {...register("eventDate")}/>
                    </div>
                    <Button variant="contained" type="submit" className="w-full h-10 bg-green-500/10 hover:bg-green-500/50 cursor-pointer">Add Event</Button>
                </form>
                </Box>
                <Box sx={{"width":"100%"}}>
                    {alert && <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" sx={{"marginTop":"1rem"}} severity={alert && alert.success ? "success" : "error"}>{alert.message}</Alert>}
                </Box>
                </Container>
            </PageWrapper>
}