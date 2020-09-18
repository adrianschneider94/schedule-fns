import {Interval} from "date-fns"

export const DateInfinity = 8640000000000000

export type Schedule = (startDate: Date | number) => IterableIterator<Interval>
export {ScheduleFromIntervals} from "./schedules"
export {invertSchedule, joinSchedules, intersectSchedules, subtractSchedules, symmetricDifferenceOfSchedules} from "./operations"