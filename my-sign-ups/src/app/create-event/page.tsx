'use client'
import PageWrapper from "@/components/PageWrapper"
import { Button, InputLabel, TextField } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"


type Inputs =  {
    eventName:string,
    eventDate: Date
}

//TODO: Implement antiforgery

export default function CreateEvent(){

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
        });
    }
    
return     <PageWrapper title="Create Event">
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
            </PageWrapper>
}