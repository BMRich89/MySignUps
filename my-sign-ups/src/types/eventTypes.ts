export type BasicEventType = {
    eventTypeName: string,
    location: string
    capacity: number
    description: string
}

export enum EventTypeFeatures  {
    basic = "basic",
    roleCreation = "roleCreation",
}