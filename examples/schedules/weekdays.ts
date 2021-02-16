import {Mondays, take, Thursdays, Weekends, WorkingDays} from "schedule-fns"
import {parseISO} from "date-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let mondays = Mondays()
for (let interval of take(mondays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-07T00:00:00.000Z, end: 2020-09-08T00:00:00.000Z }
// { start: 2020-09-14T00:00:00.000Z, end: 2020-09-15T00:00:00.000Z }
// { start: 2020-09-21T00:00:00.000Z, end: 2020-09-22T00:00:00.000Z }

let weekends = Weekends()
for (let interval of take(weekends(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-05T00:00:00.000Z, end: 2020-09-07T00:00:00.000Z }
// { start: 2020-09-12T00:00:00.000Z, end: 2020-09-14T00:00:00.000Z }
// { start: 2020-09-19T00:00:00.000Z, end: 2020-09-21T00:00:00.000Z }

let workingDays = WorkingDays()
for (let interval of take(workingDays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T00:00:00.000Z, end: 2020-09-05T00:00:00.000Z }
// { start: 2020-09-07T00:00:00.000Z, end: 2020-09-12T00:00:00.000Z }
// { start: 2020-09-14T00:00:00.000Z, end: 2020-09-19T00:00:00.000Z }