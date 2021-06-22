import {joinSchedules, Thursdays, Weekends} from "schedule.js/date-fns"
import {take} from "schedule.js"
import {formatISO, parseISO} from "date-fns"

let weekendOrThursday = joinSchedules(Weekends(), Thursdays())

let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(weekendOrThursday(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}

// 2020-09-03T00:00:00+02:00/2020-09-04T00:00:00+02:00
// 2020-09-05T00:00:00+02:00/2020-09-07T00:00:00+02:00
// 2020-09-10T00:00:00+02:00/2020-09-11T00:00:00+02:00