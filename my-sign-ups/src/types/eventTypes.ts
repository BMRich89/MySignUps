export type EventTypeInputs = {
    eventTypeName: string,
    roles: { [key: string]: number }
    online: boolean
    location: string
    capacity: number
    description: string
}

export enum EventTypeFeatures  {
    basic = "basic",
    roleCreation = "roleCreation",
}