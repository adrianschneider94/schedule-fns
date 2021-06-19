import {DateTime, Duration} from "luxon"
import {addDurationWithinSchedule, DailySchedule} from "schedule.js/luxon"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDurationWithinSchedule(DateTime.fromISO("2020-09-01T10:00:00Z"), Duration.fromObject({hours: 13}), schedule)

console.log(projectEnd.toISO())
// 2020-09-02T16:00:00.000+02:00

