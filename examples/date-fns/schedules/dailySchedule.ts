import {DailySchedule} from "schedule.js/date-fns"
import {take} from "schedule.js"
import {formatISO, parseISO} from "date-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let workHours = DailySchedule("08:00", "17:00")
for (let interval of take(workHours(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}
// 2020-09-01T08:00:00+02:00/2020-09-01T17:00:00+02:00
// 2020-09-02T08:00:00+02:00/2020-09-02T17:00:00+02:00
// 2020-09-03T08:00:00+02:00/2020-09-03T17:00:00+02:00
