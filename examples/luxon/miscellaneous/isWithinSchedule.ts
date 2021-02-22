import {DateTime} from "luxon"
import {DailySchedule, isWithinSchedule} from "schedule.js/luxon"

let schedule = DailySchedule("08:00", "17:00")
console.log(isWithinSchedule(DateTime.fromISO("2020-01-08T11:00:00.000+0100"), schedule)) // true
console.log(isWithinSchedule(DateTime.fromISO("2020-01-08T03:00:00.000+0100"), schedule)) // false
