import {DailySchedule, formatIntervalISO, invertSchedule} from "schedule.js/date-fns"
import {take} from "schedule.js/functions"
import {parseISO} from "date-fns"

let workHours = DailySchedule("08:00", "17:00")
let offHours = invertSchedule(workHours)


let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(offHours(startDate), 3)) {
    console.log(formatIntervalISO(interval))
}
// 2020-09-01T17:00:00+02:00/2020-09-02T08:00:00+02:00
// 2020-09-02T17:00:00+02:00/2020-09-03T08:00:00+02:00
// 2020-09-03T17:00:00+02:00/2020-09-04T08:00:00+02:00