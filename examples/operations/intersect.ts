import {DailySchedule, intersectSchedules, Mondays, parseISO, take} from "schedule.js"

let mondayEvenings = intersectSchedules(DailySchedule("20:00", "00:00"), Mondays())

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayEvenings(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-07T20:00:00.000+02:00/2020-09-08T00:00:00.000+02:00
// 2020-09-14T20:00:00.000+02:00/2020-09-15T00:00:00.000+02:00
// 2020-09-21T20:00:00.000+02:00/2020-09-22T00:00:00.000+02:00