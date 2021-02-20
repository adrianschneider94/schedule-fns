import {DailySchedule, Holidays, joinSchedules, subtractSchedules, Weekends} from "schedule.js"

// Define the schedule: Mo-Fr, 08:00-17:00, break from 12:30 to 13:30
// Our worker doesn't work on weekends and holidays.
let workHours = DailySchedule("08:00", "17:00")
let breaks = DailySchedule("12:30", "13:30")
let weekends = Weekends()
let holidays = Holidays("DE", "BY") // Exclude holidays

let schedule = subtractSchedules(workHours, joinSchedules(weekends, breaks, holidays))
