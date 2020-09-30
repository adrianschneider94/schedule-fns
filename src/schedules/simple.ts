import {DateInfinity, Schedule, ScheduleFromIntervals} from "../index"

export function From(startDate: Date | number): Schedule {
    return ScheduleFromIntervals({start: startDate, end: new Date(DateInfinity)})
}

export function Until(endDate: Date | number): Schedule {
    return ScheduleFromIntervals({start: new Date(-DateInfinity), end: endDate})
}
