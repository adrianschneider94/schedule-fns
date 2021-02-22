import {DateTime} from "luxon"
import {Holidays} from "schedule.js/luxon"
import {take} from "schedule.js/functions"

let publicHolidaysInBavaria = Holidays("DE", "BY", {types: ["public"]})

let startDate = DateTime.fromISO("2020-09-01T00:00Z")
for (let interval of take(publicHolidaysInBavaria(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-10-03T00:00:00.000+02:00/2020-10-04T00:00:00.000+02:00
// 2020-11-01T00:00:00.000+01:00/2020-11-02T00:00:00.000+01:00
// 2020-12-25T00:00:00.000+01:00/2020-12-27T00:00:00.000+01:00