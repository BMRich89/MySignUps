import { ObjectId } from "mongodb"

export type SignUpData = {
    eventId:ObjectId,
    signUps: { email: string }[]
}

