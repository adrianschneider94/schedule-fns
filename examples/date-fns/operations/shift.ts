import {formatIntervalISO, Mondays, shiftSchedule} from "schedule.js/date-fns"
import {take} from "schedule.js/functions"
import {parseISO} from "date-fns"

let mondayNoonToTuesdayNoon = shiftSchedule(Mondays(), {hours: 12})

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayNoonToTuesdayNoon(startDate), 3)) {
    console.log(formatIntervalISO(interval))
}
// 2020-09-07T12:00:00+02:00/2020-09-08T12:00:00+02:00
// 2020-09-14T12:00:00+02:00/2020-09-15T12:00:00+02:00
// 2020-09-21T12:00:00+02:00/2020-09-22T12:00:00+02:00