import clientPromise from "@/lib/mongo";
import { SignUpData } from "@/types/signUps";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { EventType } from "react-hook-form";


export async function POST(req: Request) {
    try {
        //TODO: dedupe
      const bod = await req.json();
      console.log("Received Data:", bod);
  
      const { eventId, signUps }: SignUpData = bod; // Ensure this matches your expected request body
      const client = await clientPromise;
      const db = client.db("mydatabase");
  
      // Insert all sign-ups concurrently, handling both successes and failures
      const insertPromises: Promise<{ success: boolean; id?: ObjectId; error?: any }>[] =
      signUps.map(async (signup: { email: string }) => {
        try {
          const result = await db.collection("signUps").insertOne({ eventId, email: signup.email });
          return { success: true, id: result.insertedId };
        } catch (error) {
          return { success: false, error };
        }
      });
  
      const results = await Promise.all(insertPromises);
  
      // Separate successful and failed insertions
      const insertedIds = results.filter(r => r.success).map(r => r.id);
      const failedInserts = results.filter(r => !r.success).map(r => r.error);
  
      console.log("Inserted IDs:", insertedIds);
      console.error("Failed Inserts:", failedInserts);
  
      // Return appropriate response
      return NextResponse.json({
        status: failedInserts.length > 0 ? 207 : 201, // 207: Multi-Status (partial success)
        insertedCount: insertedIds.length,
        failedCount: failedInserts.length,
        errors: failedInserts.length > 0 ? failedInserts : undefined,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }