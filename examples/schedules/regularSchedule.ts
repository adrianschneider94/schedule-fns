import {parseISO} from "date-fns"
import {RegularSchedule, take} from "schedule-fns"

let newYear = parseISO("2020-01-01T00:00:00.000+0200")
let everySixWeeksForOneDay = RegularSchedule(newYear, {days: 1}, {weeks: 6})

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(everySixWeeksForOneDay(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-08T21:00:00.000Z, end: 2020-09-09T21:00:00.000Z }
// { start: 2020-10-20T21:00:00.000Z, end: 2020-10-21T21:00:00.000Z }
// { start: 2020-12-01T22:00:00.000Z, end: 2020-12-02T22:00:00.000Z }