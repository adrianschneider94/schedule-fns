import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {ScheduleFromIntervals} from "schedule.js/schedules"
import {shiftSchedule} from "schedule.js/operations"

test("Shift schedule", () => {
    let i1 = {start: 0, end: 10000}
    let i2 = {start: 20000, end: 30000}
    let d = {seconds: 1}
    let startDate = 5000
    let e1 = {start: 5000, end: 11000}
    let e2 = {start: 21000, end: 31000}

    let schedule = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1), LuxonImplementation.intervalFromIntervalObject(i2))
    let shifted = shiftSchedule(LuxonImplementation)(schedule, LuxonImplementation.durationFromDurationObject(d))

    let generator = shifted(LuxonImplementation.dateTimeFromDateOrNumber(startDate))
    let entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))
})

test("Shift schedule backward", () => {
    let i1 = {start: 0, end: 10000}
    let i2 = {start: 20000, end: 30000}
    let d = {seconds: 1}
    let startDate = 5000
    let e1 = {start: 1000, end: 5000}

    let schedule = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1), LuxonImplementation.intervalFromIntervalObject(i2))
    let shifted = shiftSchedule(LuxonImplementation)(schedule, LuxonImplementation.durationFromDurationObject(d))

    let generator = shifted(LuxonImplementation.dateTimeFromDateOrNumber(startDate), "backward")
    let entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))
})