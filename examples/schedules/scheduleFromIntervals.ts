import {Interval, parseISO} from "date-fns"
import {ScheduleFromIntervals} from "schedule-fns"


let intervals: Array<Interval> = [
    {start: parseISO("2020-08-22T00:00:00.000+0200"), end: parseISO("2020-08-31T00:00:00.000+0200")},
    {start: parseISO("2020-12-24T14:00:00.000+0200"), end: parseISO("2021-01-08T00:00:00.000+0200")}
]
let myHolidays = ScheduleFromIntervals(...intervals)