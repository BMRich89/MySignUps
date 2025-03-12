import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, InputLabel } from "@mui/material";


type EventFormProps = {
    onSubmit: (data: any) => void
}

export function EventForm({onSubmit}: EventFormProps){

    type Inputs =  {
        eventName:string,
        eventDate: Date
    }
    
    
        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm<Inputs>();
           

    return     <form onSubmit={handleSubmit(onSubmit)}>
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
}