import {Mondays, Weekends, WorkingDays} from "schedule.js/date-fns"
import {take} from "schedule.js"
import {formatISO, parseISO} from "date-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let mondays = Mondays()
for (let interval of take(mondays(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}
// 2020-09-07T00:00:00+02:00/2020-09-08T00:00:00+02:00
// 2020-09-14T00:00:00+02:00/2020-09-15T00:00:00+02:00
// 2020-09-21T00:00:00+02:00/2020-09-22T00:00:00+02:00

let weekends = Weekends()
for (let interval of take(weekends(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}
// 2020-09-05T00:00:00+02:00/2020-09-07T00:00:00+02:00
// 2020-09-12T00:00:00+02:00/2020-09-14T00:00:00+02:00
// 2020-09-19T00:00:00+02:00/2020-09-21T00:00:00+02:00

let workingDays = WorkingDays()
for (let interval of take(workingDays(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}
// 2020-09-01T02:00:00+02:00/2020-09-05T00:00:00+02:00
// 2020-09-07T00:00:00+02:00/2020-09-12T00:00:00+02:00
// 2020-09-14T00:00:00+02:00/2020-09-19T00:00:00+02:00
