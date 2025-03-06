

// export async function POST(req: Request) {
//     const bod = await req.json()
//     console.log(bod)
//     const { eventName, eventDate }: EventType = bod;
//     const client = await clientPromise;
//     const db = client.db("mydatabase");
  
  
//     const newEvent = { eventName: eventName, eventDate: eventDate };
//     await db.collection("events").insertOne(newEvent);
  
//     return NextResponse.json(newEvent, { status: 201 });
//   }
  
  
  
//   export async function GET() {
//       const client = await clientPromise;
//       const db = client.db("mydatabase");
  
//       const records = await db.collection("events").find().toArray();
//       console.log(records)
  
//       return NextResponse.json(records, { status: 201 });
  
//   }