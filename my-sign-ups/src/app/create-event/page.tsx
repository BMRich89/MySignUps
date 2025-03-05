'use client'
import { Button } from "@mui/material"
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
    
return     <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2  sm:items-start">
            <div className="rounded-full bg-gray-500/25 p-5">
              <h1 className="text-4xl">Create Event</h1>
            </div>
            <div className="flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex m-3">
                        <label className="w-3/6">Event Name</label>
                        <input className="w-3/6 bg-white text-gray-800 rounded-lg px-2" required placeholder="Event Name" {...register("eventName")}/>
                    </div>
                    <div className="flex m-3">
                        <label className="w-3/6">Event Date</label>
                        <input type="date" required className="w-3/6 bg-white text-gray-800 rounded-lg px-2" placeholder="Event Date" {...register("eventDate")}/>
                    </div>
                    <Button variant="contained" type="submit" className="w-full h-10 bg-green-500/10 hover:bg-green-500/50 cursor-pointer">Add Event</Button>
                </form>
            </div>
          </main>
        </div>
    
}