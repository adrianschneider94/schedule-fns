import {DailySchedule, symmetricDifferenceOfSchedules} from "schedule.js/date-fns"
import {take} from "schedule.js"
import {formatISO, parseISO} from "date-fns"

let hoursWorker1 = DailySchedule("08:00", "17:00")
let hoursWorker2 = DailySchedule("09:00", "18:00")
let onlyOneWorkerAvailable = symmetricDifferenceOfSchedules(hoursWorker1, hoursWorker2)

let startDate = parseISO("2020-09-02")
for (let interval of take(onlyOneWorkerAvailable(startDate), 3)) {
    console.log(formatISO(interval.start) + "/" + formatISO(interval.end))
}
// 2020-09-02T08:00:00+02:00/2020-09-02T09:00:00+02:00
// 2020-09-02T17:00:00+02:00/2020-09-02T18:00:00+02:00
// 2020-09-03T08:00:00+02:00/2020-09-03T09:00:00+02:00