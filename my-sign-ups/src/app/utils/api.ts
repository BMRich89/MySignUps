import { EventData } from "@/types/eventData";
import { SignUpData } from "@/types/signUps";
import { ObjectId } from "mongodb";

export const fetchEvents = async () => {
    const response = await fetch("/api/events", { method: "GET" });
    return response.json();
  };
  
  export const deleteEvent = async (id: ObjectId) => {
    const response = await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) throw new Error("Failed to delete event");
    return response;
  };
  
  export const viewEvent = async (id: ObjectId) => {
    const response = await fetch(`/api/events?id=${id}`, { method: "GET" });
    return response.json();
  };
  
  export const updateEvent = async (data: EventData) => {
    const response = await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error("Failed to update event");
    return response;
  };
  
  export const submitSignUps = async (data: SignUpData) => {
    const response = await fetch("/api/signups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error("Failed to add sign-ups");
    return response;
  };
  