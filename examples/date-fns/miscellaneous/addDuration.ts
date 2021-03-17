import {addDurationWithinSchedule, DailySchedule} from "schedule.js/date-fns"
import {formatISO, parseISO} from "date-fns"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDurationWithinSchedule(parseISO("2020-09-01T10:00:00Z"), {hours: 13}, schedule)

console.log(formatISO(projectEnd))
// 2020-09-02T16:00:00+02:00