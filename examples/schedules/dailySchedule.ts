import {DailySchedule} from "schedule-fns"

let workHours = DailySchedule("08:00", "17:00") // Uses the system timezone
let workHoursInNewYork = DailySchedule("08:00", "17:00", {timeZone: "America/New_York"})
let partyHoursInTokyo = DailySchedule("10 pm", "3 am", {timeZone: "Asia/Tokyo", timeFormat: "h a"})