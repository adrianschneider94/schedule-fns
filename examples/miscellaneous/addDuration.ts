import {addDurationWithinSchedule, DailySchedule, durationFromDurationObject, parseISO} from "schedule.js"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDurationWithinSchedule(parseISO("2020-09-01T10:00:00Z"), durationFromDurationObject({hours: 13}), schedule)

console.log(projectEnd.toISO())
// 2020-09-02T16:00:00.000+02:00