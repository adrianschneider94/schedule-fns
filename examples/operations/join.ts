import {joinSchedules, parseISO, take, Thursdays, Weekends} from "schedule-fns"

let weekendOrThursday = joinSchedules(Weekends(), Thursdays())

let startDate = parseISO("2020-09-01T10:00:00Z")
for (let interval of take(weekendOrThursday(startDate), 3)) {
    console.log(interval.toISO())
}

// 2020-09-03T00:00:00.000+02:00/2020-09-04T00:00:00.000+02:00
// 2020-09-05T00:00:00.000+02:00/2020-09-07T00:00:00.000+02:00
// 2020-09-10T00:00:00.000+02:00/2020-09-11T00:00:00.000+02:00