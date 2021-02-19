import {Interval, intervalFromISOStrings, parseISO, ScheduleFromIntervals, take} from "schedule-fns"


let intervals: Array<Interval> = [
    intervalFromISOStrings({
        start: "2020-08-22T00:00:00.000+0200",
        end: "2020-08-31T00:00:00.000+0200"
    }),
    intervalFromISOStrings({
        start: "2020-12-24T14:00:00.000+0100",
        end: "2021-01-08T00:00:00.000+0100"
    })
]
let myHolidays = ScheduleFromIntervals(...intervals)

let startDate = parseISO("2020-01-01T00:00Z")
for (let interval of take(myHolidays(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-08-22T00:00:00.000+02:00/2020-08-31T00:00:00.000+02:00
// 2020-12-24T14:00:00.000+01:00/2021-01-08T00:00:00.000+01:00