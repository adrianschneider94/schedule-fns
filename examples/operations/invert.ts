import {DailySchedule, invertSchedule, take} from "schedule-fns"
import {parseISO} from "date-fns"

let workHours = DailySchedule("08:00", "17:00")
let offHours = invertSchedule(workHours)


let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(offHours(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T17:00:00.000Z, end: 2020-09-02T08:00:00.000Z }
// { start: 2020-09-02T17:00:00.000Z, end: 2020-09-03T08:00:00.000Z }
// { start: 2020-09-03T17:00:00.000Z, end: 2020-09-04T08:00:00.000Z }