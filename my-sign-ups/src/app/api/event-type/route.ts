import clientPromise from "@/lib/mongo";
import { BasicEventType } from "@/types/eventTypes";
import { NextResponse } from "next/server";
import { EventType } from "react-hook-form";


export async function POST(req: Request) {
    const bod = await req.json()
    console.log(bod)
    const { eventTypeName, description, location, capacity }: BasicEventType = bod;
    const client = await clientPromise;
    const db = client.db("mydatabase");
  
  
    const newEventType = { eventTypeName: eventTypeName, description: description, location: location, capacity: capacity };
    await db.collection("eventTypes").insertOne(newEventType);
  
    return NextResponse.json(newEventType, { status: 201 });
  }
  
  
  
//   export async function GET() {
//       const client = await clientPromise;
//       const db = client.db("mydatabase");
  
//       const records = await db.collection("events").find().toArray();
//       console.log(records)
  
//       return NextResponse.json(records, { status: 201 });
  
//   }