import {RegularSchedule} from "schedule.js/date-fns"
import {Duration} from "luxon"
import {take} from "schedule.js"
import {formatISO, parseISO} from "date-fns"

let newYear = parseISO("2020-01-01T00:00:00+0100")
let everySixWeeksForOneDay = RegularSchedule(newYear, Duration.fromISO("P1D"), Duration.fromISO("P6W"))

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(everySixWeeksForOneDay(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}
// 2020-09-09T00:00:00+02:00/2020-09-10T00:00:00+02:00
// 2020-10-21T00:00:00+02:00/2020-10-22T00:00:00+02:00
// 2020-12-02T00:00:00+01:00/2020-12-03T00:00:00+01:00