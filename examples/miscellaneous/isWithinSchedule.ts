import {parseISO} from "date-fns"
import {DailySchedule, isWithinSchedule} from "schedule-fns"

let schedule = DailySchedule("08:00", "17:00")
console.log(isWithinSchedule(parseISO("2020-01-08T111:00:00.000+0100"), schedule)) // true
console.log(isWithinSchedule(parseISO("2020-01-08T03:00:00.000+0100"), schedule)) // false