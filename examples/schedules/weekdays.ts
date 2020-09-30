import {Mondays, take, Thursdays, Weekends, WorkingDays} from "schedule-fns"
import {parseISO} from "date-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let mondays = Mondays()
for (let interval of take(mondays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-06T22:00:00.000Z, end: 2020-09-07T22:00:00.000Z }
// { start: 2020-09-13T22:00:00.000Z, end: 2020-09-14T22:00:00.000Z }
// { start: 2020-09-20T22:00:00.000Z, end: 2020-09-21T22:00:00.000Z }

let thursdaysInJapan = Thursdays("Asia/Tokyo")
for (let interval of take(thursdaysInJapan(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-02T15:00:00.000Z, end: 2020-09-03T15:00:00.000Z }
// { start: 2020-09-09T15:00:00.000Z, end: 2020-09-10T15:00:00.000Z }
// { start: 2020-09-16T15:00:00.000Z, end: 2020-09-17T15:00:00.000Z }

let weekends = Weekends()
for (let interval of take(weekends(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-04T22:00:00.000Z, end: 2020-09-06T22:00:00.000Z }
// { start: 2020-09-11T22:00:00.000Z, end: 2020-09-13T22:00:00.000Z }
// { start: 2020-09-18T22:00:00.000Z, end: 2020-09-20T22:00:00.000Z }

let workingDays = WorkingDays()
for (let interval of take(workingDays(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T00:00:00.000Z, end: 2020-09-04T22:00:00.000Z }
// { start: 2020-09-06T22:00:00.000Z, end: 2020-09-11T22:00:00.000Z }
// { start: 2020-09-13T22:00:00.000Z, end: 2020-09-18T22:00:00.000Z }