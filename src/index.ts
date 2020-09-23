import {Interval} from "date-fns"

export const MAX_RECURSIONS = 1000
export const DateInfinity = 8640000000000000

export type direction = "forward" | "backward" | 1 | -1
export type Schedule = (startDate: Date | number, direction?: direction) => IterableIterator<Interval>

export * from "./schedules"
export * from "./operations"
export * from "./functions"
