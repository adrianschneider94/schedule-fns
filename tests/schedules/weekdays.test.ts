import {parseISO} from "date-fns"

import {
    Fridays,
    Mondays,
    Saturdays,
    Schedule,
    Sundays,
    Thursdays,
    Tuesdays,
    Wednesdays,
    Weekends,
    WorkingDays
} from "schedule-fns"
import {OnSpecificWeekday} from "schedule-fns/schedules/weekdays"
import {areIntervalsEqual} from "schedule-fns/functions/intervals"

test('SpecificDay', () => {
    let schedule = OnSpecificWeekday(1)
    let generator = schedule(parseISO("2020-09-23"))

    let entry = generator.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2020-09-27T22:00Z"),
        end: parseISO("2020-09-28T22:00Z")
    })).toStrictEqual(true)

    entry = generator.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2020-10-04T22:00Z"),
        end: parseISO("2020-10-05T22:00Z")
    })).toStrictEqual(true)
})

test('Weekdays', () => {
    let schedule: Schedule
    let nextInterval: Interval
    let startDate = parseISO("2020-09-28T00:00Z")

    schedule = Mondays()
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-28T00:00Z"),
        end: parseISO("2020-09-28T22:00Z")
    })).toStrictEqual(true)

    schedule = Tuesdays()
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-28T22:00Z"),
        end: parseISO("2020-09-29T22:00Z")
    })).toStrictEqual(true)

    schedule = Wednesdays()
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-29T22:00Z"),
        end: parseISO("2020-09-30T22:00Z")
    })).toStrictEqual(true)

    schedule = Thursdays()
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-30T22:00Z"),
        end: parseISO("2020-10-01T22:00Z")
    })).toStrictEqual(true)

    schedule = Fridays()
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-01T22:00Z"),
        end: parseISO("2020-10-02T22:00Z")
    })).toStrictEqual(true)

    schedule = Saturdays()
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-02T22:00Z"),
        end: parseISO("2020-10-03T22:00Z")
    })).toStrictEqual(true)

    schedule = Sundays()
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-03T22:00Z"),
        end: parseISO("2020-10-04T22:00Z")
    })).toStrictEqual(true)
})

test('Weekends', () => {
    let schedule = Weekends()
    let startDate = parseISO("2020-09-28T00:00Z")

    let nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-02T22:00Z"),
        end: parseISO("2020-10-04T22:00Z")
    })).toStrictEqual(true)
})

test('WorkingDays', () => {
    let schedule = WorkingDays()
    let startDate = parseISO("2020-09-28T00:00Z")

    let nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-28T00:00Z"),
        end: parseISO("2020-10-02T22:00Z")
    })).toStrictEqual(true)
})