import {DailySchedule, invertSchedule} from "schedule-fns"

let workHours = DailySchedule("08:00", "17:00", {timeZone: "Europe/Berlin"})
let offHours = invertSchedule(workHours)