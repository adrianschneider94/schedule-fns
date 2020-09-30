import {Holidays, take} from "schedule-fns"
import {parseISO} from "date-fns"

let publicHolidaysInBavaria = Holidays("DE", "BY", {types: ["public"]})

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(publicHolidaysInBavaria(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-10-02T22:00:00.000Z, end: 2020-10-03T22:00:00.000Z }
// { start: 2020-10-31T23:00:00.000Z, end: 2020-11-01T23:00:00.000Z }
// { start: 2020-12-24T23:00:00.000Z, end: 2020-12-26T23:00:00.000Z }