import {DailySchedule, symmetricDifferenceOfSchedules, take} from "schedule-fns"
import {parseISO} from "date-fns"

let hoursWorker1 = DailySchedule("08:00", "17:00")
let hoursWorker2 = DailySchedule("09:00", "18:00")
let onlyOneWorkerAvailable = symmetricDifferenceOfSchedules(hoursWorker1, hoursWorker2)

let startDate = parseISO("2020-09-02")
for (let interval of take(onlyOneWorkerAvailable(startDate), 3)) {
    console.log(interval)
}
// { start: 2020-09-02T06:00:00.000Z, end: 2020-09-02T07:00:00.000Z }
// { start: 2020-09-02T15:00:00.000Z, end: 2020-09-02T16:00:00.000Z }
// { start: 2020-09-03T06:00:00.000Z, end: 2020-09-03T07:00:00.000Z }