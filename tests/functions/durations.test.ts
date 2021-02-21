import {addDurations, addDurationWithinSchedule} from "schedule.js/functions/durations"
import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {RegularSchedule, ScheduleFromIntervals} from "schedule.js/schedules"

test("durationToMilliseconds: 5 hours, 6 minutes, 7 seconds", () => {
    let input = {
        hours: 5,
        minutes: 6,
        seconds: 7
    }
    expect(LuxonImplementation.roughDurationToMilliseconds(LuxonImplementation.durationFromDurationObject(input))).toStrictEqual(18367000)
})

test("multiplyDuration", () => {
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
    expect(LuxonImplementation.multiplyDuration(LuxonImplementation.durationFromDurationObject(input), factor)).toBeSameDurationAs(LuxonImplementation.durationFromDurationObject(expected))
})

test("addDurations", () => {
    let duration1 = {years: 1, months: 2, weeks: 3, days: 4, hours: 5, minutes: 6, seconds: 7}
    let duration2 = {years: 8, months: 7, weeks: 6, days: 5, hours: 4, minutes: 3, seconds: 2}
    let duration3 = {years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1}
    let expected = {years: 10, months: 10, weeks: 10, days: 10, hours: 10, minutes: 10, seconds: 10}
    expect(addDurations(LuxonImplementation)(LuxonImplementation.durationFromDurationObject(duration1), LuxonImplementation.durationFromDurationObject(duration2), LuxonImplementation.durationFromDurationObject(duration3))).toBeSameDurationAs(LuxonImplementation.durationFromDurationObject(expected))
})

test("addDuration 1", () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 20, end: 30}
    let schedule = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(interval1), LuxonImplementation.intervalFromIntervalObject(interval2))
    let startDate = 0
    let duration = {seconds: 0.015}
    let expected = 25

    let result = addDurationWithinSchedule(LuxonImplementation)(LuxonImplementation.dateTimeFromDateOrNumber(startDate), LuxonImplementation.durationFromDurationObject(duration), schedule)
    expect(result).toBeSameDateTimeAs(LuxonImplementation.dateTimeFromDateOrNumber(expected))
})

test("addDuration 2", () => {
    let interval1 = {start: 5, end: 10}
    let interval2 = {start: 20, end: 30}
    let schedule = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(interval1), LuxonImplementation.intervalFromIntervalObject(interval2))
    let startDate = 0
    let duration = {seconds: 0.015}
    let expected = 30

    let result = addDurationWithinSchedule(LuxonImplementation)(LuxonImplementation.dateTimeFromDateOrNumber(startDate), LuxonImplementation.durationFromDurationObject(duration), schedule)
    expect(result).toBeSameDateTimeAs(LuxonImplementation.dateTimeFromDateOrNumber(expected))
})

test("addDuration 3", () => {
    let interval1 = {start: 5, end: 10}
    let interval2 = {start: 20, end: 30}
    let schedule = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(interval1), LuxonImplementation.intervalFromIntervalObject(interval2))
    let startDate = 0
    let duration = {seconds: 0.030}

    expect(() => addDurationWithinSchedule(LuxonImplementation)(LuxonImplementation.dateTimeFromDateOrNumber(startDate), LuxonImplementation.durationFromDurationObject(duration), schedule)).toThrowError()
})

test("addDuration 4", () => {
    let startDate = new Date()
    let duration_ = {seconds: 1}
    let period = {seconds: 2}
    let duration = {years: 1}

    let schedule = RegularSchedule(LuxonImplementation)(LuxonImplementation.dateTimeFromDateOrNumber(startDate), LuxonImplementation.durationFromDurationObject(duration_), LuxonImplementation.durationFromDurationObject(period))
    expect(() => addDurationWithinSchedule(LuxonImplementation)(LuxonImplementation.dateTimeFromDateOrNumber(startDate), LuxonImplementation.durationFromDurationObject(duration), schedule)).toThrowError()
})

