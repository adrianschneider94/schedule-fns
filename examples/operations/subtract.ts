import {DailySchedule, subtractSchedules, take} from "schedule-fns"
import {parseISO} from "date-fns"

let workHours = DailySchedule("08:00", "17:00")
let breaks = DailySchedule("12:30", "13:30")
let workTime = subtractSchedules(workHours, breaks)

let startDate = parseISO("2020-09-02")
for (let interval of take(workTime(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-02T06:00:00.000Z, end: 2020-09-02T10:30:00.000Z }
// { start: 2020-09-02T11:30:00.000Z, end: 2020-09-02T15:00:00.000Z }
// { start: 2020-09-03T06:00:00.000Z, end: 2020-09-03T10:30:00.000Z }