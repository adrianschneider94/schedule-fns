import {DailySchedule, parseISO, take} from "schedule-fns"

let startDate = parseISO("2020-09-01T00:00Z")

let workHours = DailySchedule("08:00", "17:00")
for (let interval of take(workHours(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T08:00:00.000+02:00/2020-09-01T17:00:00.000+02:00
// 2020-09-02T08:00:00.000+02:00/2020-09-02T17:00:00.000+02:00
// 2020-09-03T08:00:00.000+02:00/2020-09-03T17:00:00.000+02:00


// Normally schedule-fns will take the local time zone. However you can specify
// a custom IANA time zone.
let workHoursInTokyo = DailySchedule("08:00", "21:00", {timeZone: "Asia/Tokyo"})
for (let interval of take(workHoursInTokyo(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-01T02:00:00.000+02:00/2020-09-01T21:00:00.000+09:00
// 2020-09-02T08:00:00.000+09:00/2020-09-02T21:00:00.000+09:00
// 2020-09-03T08:00:00.000+09:00/2020-09-03T21:00:00.000+09:00