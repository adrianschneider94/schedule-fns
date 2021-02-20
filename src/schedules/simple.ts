import {DateTime, InfintyDateTime, NegInfinityDateTime, Schedule, ScheduleFromIntervals} from "../index"
import {createInterval} from "../functions/dateLibrary"

export function From(startDate: DateTime): Schedule {
    return ScheduleFromIntervals(createInterval(startDate, InfintyDateTime))
}

export function Until(endDate: DateTime): Schedule {
    return ScheduleFromIntervals(createInterval(NegInfinityDateTime, endDate))
}
