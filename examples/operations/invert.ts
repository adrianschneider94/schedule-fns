import {DateTime} from "luxon"
import {DailySchedule, invertSchedule} from "schedule.js/luxon"
import {take} from "schedule.js/functions"

let workHours = DailySchedule("08:00", "17:00")
let offHours = invertSchedule(workHours)


let startDate = DateTime.fromISO("2020-09-01T10:00:00Z")
for (let interval of take(offHours(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T17:00:00.000+02:00/2020-09-02T08:00:00.000+02:00
// 2020-09-02T17:00:00.000+02:00/2020-09-03T08:00:00.000+02:00
// 2020-09-03T17:00:00.000+02:00/2020-09-04T08:00:00.000+02:00