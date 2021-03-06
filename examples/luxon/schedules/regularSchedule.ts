import {RegularSchedule} from "schedule.js/luxon"
import {DateTime, Duration} from "luxon"
import {take} from "schedule.js"

let newYear = DateTime.fromISO("2020-01-01T00:00:00.000+0100")
let everySixWeeksForOneDay = RegularSchedule(newYear, Duration.fromISO("P1D"), Duration.fromISO("P6W"))

let startDate = DateTime.fromISO("2020-09-01T00:00Z")
for (let interval of take(everySixWeeksForOneDay(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-09T00:00:00.000+02:00/2020-09-10T00:00:00.000+02:00
// 2020-10-21T00:00:00.000+02:00/2020-10-22T00:00:00.000+02:00
// 2020-12-02T00:00:00.000+01:00/2020-12-03T00:00:00.000+01:00