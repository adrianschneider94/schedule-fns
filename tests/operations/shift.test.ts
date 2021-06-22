import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("Shift schedule", (lib) => {
    let i1 = {start: 0, end: 10000}
    let i2 = {start: 20000, end: 30000}
    let d = {seconds: 1}
    let startDate = 5000
    let e1 = {start: 5000, end: 11000}
    let e2 = {start: 21000, end: 31000}

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))
    let shifted = lib.shiftSchedule(schedule, lib.durationFromDurationObject(d))

    let generator = shifted(lib.dateTimeFromDateOrNumber(startDate))
    let entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))
})

each(implementation).test("Shift schedule backward", (lib) => {
    let i1 = {start: 0, end: 10000}
    let i2 = {start: 20000, end: 30000}
    let d = {seconds: 1}
    let startDate = 5000
    let e1 = {start: 1000, end: 5000}

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))
    let shifted = lib.shiftSchedule(schedule, lib.durationFromDurationObject(d))

    let generator = shifted(lib.dateTimeFromDateOrNumber(startDate), "backward")
    let entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))
})