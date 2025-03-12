import clientPromise from "@/lib/mongo";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Event = {
  eventName: string,
  eventDate: Date
}


export async function POST(req: Request) {
  const bod = await req.json()
  console.log(bod)
  const { eventName, eventDate }: Event = bod;
  const client = await clientPromise;
  const db = client.db("mydatabase");


  const newEvent = { eventName: eventName, eventDate: eventDate };
  await db.collection("events").insertOne(newEvent);

  return NextResponse.json(newEvent, { status: 201 });
}

export async function GET() {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const records = await db.collection("events").find().toArray();
    console.log(records)

    return NextResponse.json(records, { status: 201 });

}

export async function DELETE(req: Request) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const body = await req.json();
  const id:ObjectId = body.id;
  const objectId = new ObjectId(id);

  await db.collection("events").deleteOne({_id: objectId});

  return NextResponse.json( { status: 201 });

}

export async function PUT(req:Request){
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const body = await req.json();
  const id:ObjectId = body.id;
  const objectId = new ObjectId(id);
  const { eventName, eventDate }: Event = body;

  await db.collection("events").updateOne({_id: objectId}, {$set: {eventName: eventName, eventDate: eventDate}});
  return NextResponse.json( { status: 201 });
}