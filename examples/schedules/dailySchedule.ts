import {DailySchedule, take} from "schedule-fns"
import {parseISO} from "date-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let workHours = DailySchedule("08:00", "17:00") // Uses the system timezone
for (let interval of take(workHours(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T06:00:00.000Z, end: 2020-09-01T15:00:00.000Z }
// { start: 2020-09-02T06:00:00.000Z, end: 2020-09-02T15:00:00.000Z }
// { start: 2020-09-03T06:00:00.000Z, end: 2020-09-03T15:00:00.000Z }

let workHoursInNewYork = DailySchedule("08:00", "17:00", {timeZone: "America/New_York"})
for (let interval of take(workHoursInNewYork(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T12:00:00.000Z, end: 2020-09-01T21:00:00.000Z }
// { start: 2020-09-02T12:00:00.000Z, end: 2020-09-02T21:00:00.000Z }
// { start: 2020-09-03T12:00:00.000Z, end: 2020-09-03T21:00:00.000Z }

let partyHoursInTokyo = DailySchedule("10 pm", "3 am", {timeZone: "Asia/Tokyo", timeFormat: "h a"})
for (let interval of take(partyHoursInTokyo(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-01T13:00:00.000Z, end: 2020-09-01T18:00:00.000Z }
// { start: 2020-09-02T13:00:00.000Z, end: 2020-09-02T18:00:00.000Z }
// { start: 2020-09-03T13:00:00.000Z, end: 2020-09-03T18:00:00.000Z }