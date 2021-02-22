import {DateTime, Interval} from "luxon"
import {ScheduleFromIntervals} from "schedule.js/luxon"
import {take} from "schedule.js/functions"


let intervals: Array<Interval> = [
    Interval.fromISO("2020-08-22T00:00:00.000+0200/2020-08-31T00:00:00.000+0200"),
    Interval.fromISO("2020-12-24T14:00:00.000+0100/2021-01-08T00:00:00.000+0100")
]
let myHolidays = ScheduleFromIntervals(...intervals)

let startDate = DateTime.fromISO("2020-01-01T00:00Z")
for (let interval of take(myHolidays(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-08-22T00:00:00.000+02:00/2020-08-31T00:00:00.000+02:00
// 2020-12-24T14:00:00.000+01:00/2021-01-08T00:00:00.000+01:00