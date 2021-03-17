import {formatIntervalISO, ScheduleFromIntervals} from "schedule.js/date-fns"
import {take} from "schedule.js/functions"
import {parseISO} from "date-fns"


let intervals: Array<Interval> = [
    {start: parseISO("2020-08-22T00:00:00.000+0200"), end: parseISO("2020-08-31T00:00:00.000+0200")},
    {start: parseISO("2020-12-24T14:00:00.000+0100"), end: parseISO("2021-01-08T00:00:00.000+0100")}
]
let myHolidays = ScheduleFromIntervals(...intervals)

let startDate = parseISO("2020-01-01T00:00Z")
for (let interval of take(myHolidays(startDate), 3)) {
    console.log(formatIntervalISO(interval))
}
// 2020-08-22T00:00:00+02:00/2020-08-31T00:00:00+02:00
// 2020-12-24T14:00:00+01:00/2021-01-08T00:00:00+01:00