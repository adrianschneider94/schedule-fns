import {addDuration, DailySchedule, joinSchedules, subtractSchedules, Weekends, Holidays} from "schedule-fns"
import {parseISO} from "date-fns"

// Define the schedule: Mo-Fr, 08:00-16:00, break from 12:30 to 13:30, German timezone.
// Our worker doesn't work on weekends and holidays.
let workHours = DailySchedule("08:00", "17:00", {timeZone: "Europe/Berlin"})

let breaks = DailySchedule("12:30", "13:30")  // You can drop the timezone, schedule-fns will use the system timezone then
let weekends = Weekends()
let holidays = Holidays("DE", "BY") // Exclude holidays

let schedule = subtractSchedules(workHours, joinSchedules(weekends, breaks, holidays))

// We want to know when 47 hours have passed in the schedule to determine the project deadline
// We start at 15:20 on Tuesday, April the 28st (German timezone)
let projectStart = parseISO("2020-04-28T15:20:00.000+0200")

// 47 hours are 5 full working days and 7 hours. But May the 1st is a bank holiday in Germany.
// So we should finish on Thursday, May the 7th at 14:20.
let projectEnd = addDuration(projectStart, {hours: 47}, schedule)
console.log(projectEnd.toISOString()) // 2020-05-07T12:20:00.000Z which is 14:20 in German time