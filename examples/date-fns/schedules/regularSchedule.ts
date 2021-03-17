import {formatIntervalISO, RegularSchedule} from "schedule.js/date-fns"
import {take} from "schedule.js/functions"
import {parseISO} from "date-fns"

let newYear = parseISO("2020-01-01T00:00:00.000+0100")
let everySixWeeksForOneDay = RegularSchedule(newYear, {days: 1}, {weeks: 6})

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(everySixWeeksForOneDay(startDate), 3)) {
    console.log(formatIntervalISO(interval))
}
// 2020-09-09T00:00:00+02:00/2020-09-10T00:00:00+02:00
// 2020-10-21T00:00:00+02:00/2020-10-22T00:00:00+02:00
// 2020-12-02T00:00:00+01:00/2020-12-03T00:00:00+01:00
