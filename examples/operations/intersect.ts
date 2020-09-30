import {DailySchedule, intersectSchedules, Mondays, take} from "schedule-fns"
import {parseISO} from "date-fns"

let mondayEvenings = intersectSchedules(DailySchedule("20:00", "00:00", {timeZone: "Etc/UTC"}), Mondays("Etc/UTC"))

let startDate = parseISO("2020-09-02")
for (let interval of take(mondayEvenings(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-07T20:00:00.000Z, end: 2020-09-08T00:00:00.000Z }
// { start: 2020-09-14T20:00:00.000Z, end: 2020-09-15T00:00:00.000Z }
// { start: 2020-09-21T20:00:00.000Z, end: 2020-09-22T00:00:00.000Z }