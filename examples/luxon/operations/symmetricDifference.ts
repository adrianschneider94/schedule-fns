import {DailySchedule, symmetricDifferenceOfSchedules} from "schedule.js/luxon"
import {DateTime} from "luxon"
import {take} from "schedule.js"

let hoursWorker1 = DailySchedule("08:00", "17:00")
let hoursWorker2 = DailySchedule("09:00", "18:00")
let onlyOneWorkerAvailable = symmetricDifferenceOfSchedules(hoursWorker1, hoursWorker2)

let startDate = DateTime.fromISO("2020-09-02")
for (let interval of take(onlyOneWorkerAvailable(startDate), 3)) {
    console.log(interval.toISO())
}
// 2020-09-02T08:00:00.000+02:00/2020-09-02T09:00:00.000+02:00
// 2020-09-02T17:00:00.000+02:00/2020-09-02T18:00:00.000+02:00
// 2020-09-03T08:00:00.000+02:00/2020-09-03T09:00:00.000+02:00