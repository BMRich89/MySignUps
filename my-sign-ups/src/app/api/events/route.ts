import clientPromise from "@/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Event = {
    eventName:string,
    eventDate:Date
}


export async function POST(req: Request) {

    if (req.method === "POST") {
        const bod = await req.json()
      const  {eventName,eventDate}:Event = bod.data;
        console.log(bod)
      const client = await clientPromise;
      const db = client.db("mydatabase");


      const newEvent = { eventName: eventName, eventDate: eventDate };
    await db.collection("events").insertOne(newEvent);

    return NextResponse.json(newEvent, { status: 201 });
    }
  }