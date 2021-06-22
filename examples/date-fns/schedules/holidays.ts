import {Holidays} from "schedule.js/date-fns"
import {take} from "schedule.js"
import {formatISO, parseISO} from "date-fns"

let publicHolidaysInBavaria = Holidays({
    country: "DE", state: "BY",
    options: {
        types: ["public"]
    }
})

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(publicHolidaysInBavaria(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}
// 2020-10-03T00:00:00+02:00/2020-10-04T00:00:00+02:00
// 2020-11-01T00:00:00+01:00/2020-11-02T00:00:00+01:00
// 2020-12-25T00:00:00+01:00/2020-12-27T00:00:00+01:00