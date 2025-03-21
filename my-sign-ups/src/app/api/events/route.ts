import clientPromise from "@/lib/mongo";
import { EventData } from "@/types/eventData";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const bod = await req.json();
  console.log(bod);
  const { name, date, description, roles, capacity, location, limitedAttendees, rolesLimited }: EventData = bod;
  const client = await clientPromise;
  const db = client.db("mydatabase");

  const newEvent = {
    name: name,
    date: date,
    description: description,
    roles: roles,
    capacity: capacity,
    location: location,
    limitedAttendees: limitedAttendees,
    rolesLimited: rolesLimited,
  };
  await db.collection("events").insertOne(newEvent);

  return NextResponse.json(newEvent, { status: 201 });
}

export async function GET(req: Request) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  if (id) {
    const objectId = new ObjectId(id);
    const event = await db.collection("events").findOne({ _id: objectId });
    if (event) {
      return NextResponse.json(event, { status: 200 });
    } else {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
  } else {
    const records = await db.collection("events").find().toArray();
    return NextResponse.json(records, { status: 200 });
  }
}

export async function DELETE(req: Request) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const body = await req.json();
  const id: ObjectId = body.id;
  console.log(id);
  const objectId = new ObjectId(id);

  await db.collection("events").deleteOne({ _id: objectId });

  return NextResponse.json({ status: 201 });
}

export async function PUT(req: Request) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const body = await req.json();
  console.log(body)
  const { _id, name, date, description, roles, capacity, location, limitedAttendees, rolesLimited }: EventData = body;
  const id: ObjectId =  new ObjectId(_id); // ✅ Convert _id to ObjectId
  console.log(id)
  const result = await db.collection("events").updateOne({ _id: id }, { $set: { name:name, date:date, description:description, roles:roles, capacity:capacity, location:location, limitedAttendees:limitedAttendees, rolesLimited:rolesLimited } });
  if(result.modifiedCount > 0){
    return NextResponse.json({ status: 201 });
  }
  return NextResponse.json({ status: 404 });
}
