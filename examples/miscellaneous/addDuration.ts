import {addDuration, DailySchedule} from "schedule-fns"
import {parseISO} from "date-fns"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDuration(parseISO("2020-09-01T10:00:00+0200"), {hours: 13}, schedule)

console.log(projectEnd)
// 2020-09-02T12:00:00.000Z