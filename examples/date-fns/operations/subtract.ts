import {DailySchedule, formatIntervalISO, subtractSchedules} from "schedule.js/date-fns"
import {take} from "schedule.js/functions"
import {parseISO} from "date-fns"

let workHours = DailySchedule("08:00", "17:00")
let breaks = DailySchedule("12:30", "13:30")
let workTime = subtractSchedules(workHours, breaks)

let startDate = parseISO("2020-09-02")
for (let interval of take(workTime(startDate), 3)) {
    console.log(formatIntervalISO(interval))
}
// 2020-09-02T08:00:00+02:00/2020-09-02T12:30:00+02:00
// 2020-09-02T13:30:00+02:00/2020-09-02T17:00:00+02:00
// 2020-09-03T08:00:00+02:00/2020-09-03T12:30:00+02:00