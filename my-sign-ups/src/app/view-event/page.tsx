'use client'
import { EventForm } from "@/components/forms/EventForm"
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