import {DateInfinity, DateTime, NegDateInfinity, Schedule, ScheduleFromIntervals} from "../index"
import {createInterval} from "schedule-fns/functions/misc"

export function From(startDate: DateTime): Schedule {
    return ScheduleFromIntervals(createInterval(startDate, DateInfinity))
}

export function Until(endDate: DateTime): Schedule {
    return ScheduleFromIntervals(createInterval(NegDateInfinity, endDate))
}
