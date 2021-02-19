import {InfintyDateTime, DateTime, NegInfinityDateTime, Schedule, ScheduleFromIntervals} from "../index"
import {createInterval} from "schedule-fns/functions/misc"

export function From(startDate: DateTime): Schedule {
    return ScheduleFromIntervals(createInterval(startDate, InfintyDateTime))
}

export function Until(endDate: DateTime): Schedule {
    return ScheduleFromIntervals(createInterval(NegInfinityDateTime, endDate))
}
