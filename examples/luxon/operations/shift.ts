import {Mondays, shiftSchedule} from "schedule.js/luxon"
import {DateTime, Duration} from "luxon"
import {take} from "schedule.js"

let mondayNoonToTuesdayNoon = shiftSchedule(Mondays(), Duration.fromObject({hours: 12}))

let startDate = DateTime.fromISO("2020-09-02")
for (let interval of take(mondayNoonToTuesdayNoon(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-07T12:00:00.000+02:00/2020-09-08T12:00:00.000+02:00
// 2020-09-14T12:00:00.000+02:00/2020-09-15T12:00:00.000+02:00
// 2020-09-21T12:00:00.000+02:00/2020-09-22T12:00:00.000+02:00