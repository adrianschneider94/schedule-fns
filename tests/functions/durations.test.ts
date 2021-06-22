import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("durationToMilliseconds: 5 hours, 6 minutes, 7 seconds", (lib) => {
    let input = {
        hours: 5,
        minutes: 6,
        seconds: 7
    }
    expect(lib.durationToMilliseconds(lib.durationFromDurationObject(input))).toStrictEqual(18367000)
})

each(implementation).test("multiplyDuration", (lib) => {
    let input = {
        years: 1,
        months: 2,
        weeks: 3,
        days: 4,
        hours: 5,
        minutes: 6,
        seconds: 7
    }
    let factor = 2
    let expected = {
        years: 2,
        months: 4,
        weeks: 6,
        days: 8,
        hours: 10,
        minutes: 12,
        seconds: 14
    }
    expect(lib.multiplyDuration(lib.durationFromDurationObject(input), factor)).toBeSameDurationAs(lib.durationFromDurationObject(expected))
})

each(implementation).test("addDurations", (lib) => {
    let duration1 = {years: 1, months: 2, weeks: 3, days: 4, hours: 5, minutes: 6, seconds: 7}
    let duration2 = {years: 8, months: 7, weeks: 6, days: 5, hours: 4, minutes: 3, seconds: 2}
    let duration3 = {years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1}
    let expected = {years: 10, months: 10, weeks: 10, days: 10, hours: 10, minutes: 10, seconds: 10}
    expect(lib.addDurations(lib.durationFromDurationObject(duration1), lib.durationFromDurationObject(duration2), lib.durationFromDurationObject(duration3))).toBeSameDurationAs(lib.durationFromDurationObject(expected))
})

each(implementation).test("addDuration 1", (lib) => {
    let interval1 = {start: 0, end: 10000}
    let interval2 = {start: 20000, end: 30000}
    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))
    let startDate = 0
    let duration = {seconds: 15}
    let expected = 25000

    let result = lib.addDurationWithinSchedule(lib.dateTimeFromDateOrNumber(startDate), lib.durationFromDurationObject(duration), schedule)
    expect(result).toBeSameDateTimeAs(lib.dateTimeFromDateOrNumber(expected))
})

each(implementation).test("addDuration 2", (lib) => {
    let interval1 = {start: 5000, end: 10000}
    let interval2 = {start: 20000, end: 30000}
    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))
    let startDate = 0
    let duration = {seconds: 15}
    let expected = 30000

    let result = lib.addDurationWithinSchedule(lib.dateTimeFromDateOrNumber(startDate), lib.durationFromDurationObject(duration), schedule)
    expect(result).toBeSameDateTimeAs(lib.dateTimeFromDateOrNumber(expected))
})

each(implementation).test("addDuration 3", (lib) => {
    let interval1 = {start: 5000, end: 10000}
    let interval2 = {start: 20000, end: 30000}
    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))
    let startDate = 0
    let duration = {seconds: 30}

    expect(() => lib.addDurationWithinSchedule(lib.dateTimeFromDateOrNumber(startDate), lib.durationFromDurationObject(duration), schedule)).toThrowError()
})

each(implementation).test("addDuration 4", (lib) => {
    let startDate = new Date()
    let duration_ = {seconds: 1}
    let period = {seconds: 2}
    let duration = {years: 1}

    let schedule = lib.RegularSchedule(lib.dateTimeFromDateOrNumber(startDate), lib.durationFromDurationObject(duration_), lib.durationFromDurationObject(period))
    expect(() => lib.addDurationWithinSchedule(lib.dateTimeFromDateOrNumber(startDate), lib.durationFromDurationObject(duration), schedule)).toThrowError()
})

