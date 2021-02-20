import {
    durationFromDurationObject,
    intervalFromIntervalObject,
    ScheduleFromIntervals,
    shiftSchedule
} from "schedule-fns"
import {dateTimeFromDateOrNumber} from "schedule-fns/functions/dateLibrary"

test('Shift schedule', () => {
    let i1 = {start: 0, end: 10000}
    let i2 = {start: 20000, end: 30000}
    let d = {seconds: 1}
    let startDate = 5000
    let e1 = {start: 5000, end: 11000}
    let e2 = {start: 21000, end: 31000}

    let schedule = ScheduleFromIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2))
    let shifted = shiftSchedule(schedule, durationFromDurationObject(d))

    let generator = shifted(dateTimeFromDateOrNumber(startDate))
    let entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))
})

test('Shift schedule backward', () => {
    let i1 = {start: 0, end: 10000}
    let i2 = {start: 20000, end: 30000}
    let d = {seconds: 1}
    let startDate = 5000
    let e1 = {start: 1000, end: 5000}

    let schedule = ScheduleFromIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2))
    let shifted = shiftSchedule(schedule, durationFromDurationObject(d))

    let generator = shifted(dateTimeFromDateOrNumber(startDate), "backward")
    let entry = generator.next()
    expect(entry.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))
})