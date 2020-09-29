import {addDuration, DailySchedule} from "schedule-fns"

let schedule = DailySchedule("08:00", "17:00")
let projectEnd = addDuration(new Date(), {hours: 13}, schedule)
