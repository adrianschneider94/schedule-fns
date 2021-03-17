import {DateTime} from "luxon"
import {Mondays, Weekends, WorkingDays} from "schedule.js/luxon"
import {take} from "schedule.js/functions"

let startDate = DateTime.fromISO("2020-09-01T00:00Z")

let mondays = Mondays()
for (let interval of take(mondays(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-07T00:00:00.000+02:00/2020-09-08T00:00:00.000+02:00
// 2020-09-14T00:00:00.000+02:00/2020-09-15T00:00:00.000+02:00
// 2020-09-21T00:00:00.000+02:00/2020-09-22T00:00:00.000+02:00

let weekends = Weekends()
for (let interval of take(weekends(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-05T00:00:00.000+02:00/2020-09-07T00:00:00.000+02:00
// 2020-09-12T00:00:00.000+02:00/2020-09-14T00:00:00.000+02:00
// 2020-09-19T00:00:00.000+02:00/2020-09-21T00:00:00.000+02:00

let workingDays = WorkingDays()
for (let interval of take(workingDays(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T02:00:00.000+02:00/2020-09-05T00:00:00.000+02:00
// 2020-09-07T00:00:00.000+02:00/2020-09-12T00:00:00.000+02:00
// 2020-09-14T00:00:00.000+02:00/2020-09-19T00:00:00.000+02:00

let workingDaysInTokyo = WorkingDays({timeZone: "Asia/Tokyo"})
for (let interval of take(workingDaysInTokyo(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T02:00:00.000+02:00/2020-09-05T00:00:00.000+09:00
// 2020-09-07T00:00:00.000+09:00/2020-09-12T00:00:00.000+09:00
// 2020-09-14T00:00:00.000+09:00/2020-09-19T00:00:00.000+09:00