import {Interval, parseISO} from "date-fns"
import {ScheduleFromIntervals, take} from "schedule-fns"


let intervals: Array<Interval> = [
    {start: parseISO("2020-08-22T00:00:00.000+0200"), end: parseISO("2020-08-31T00:00:00.000+0200")},
    {start: parseISO("2020-12-24T14:00:00.000+0200"), end: parseISO("2021-01-08T00:00:00.000+0200")}
]
let myHolidays = ScheduleFromIntervals(...intervals)

let startDate = parseISO("2020-01-01T00:00Z")
for (let interval of take(myHolidays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-08-21T22:00:00.000Z, end: 2020-08-30T22:00:00.000Z }
// { start: 2020-12-24T12:00:00.000Z, end: 2021-01-07T22:00:00.000Z }