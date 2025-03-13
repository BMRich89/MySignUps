import { ObjectId } from "mongodb";

export interface EventData {
    _id: ObjectId;
    name: string,
    date: Date,
    description: string,
    location: string,
    capacity: null | number,
    limitedAttendees: boolean,
    rolesLimited:boolean,
    roles: { role: string, limit: number }[]
}