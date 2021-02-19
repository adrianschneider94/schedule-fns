import {durationFromDurationObject, parseISO, RegularSchedule, take} from "schedule-fns"

let newYear = parseISO("2020-01-01T00:00:00.000+0100")
let everySixWeeksForOneDay = RegularSchedule(newYear, durationFromDurationObject({days: 1}), durationFromDurationObject({weeks: 6}))

let startDate = parseISO("2020-09-01T00:00Z")
for (let interval of take(everySixWeeksForOneDay(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-09T00:00:00.000+02:00/2020-09-10T00:00:00.000+02:00
// 2020-10-21T00:00:00.000+02:00/2020-10-22T00:00:00.000+02:00
// 2020-12-02T00:00:00.000+01:00/2020-12-03T00:00:00.000+01:00