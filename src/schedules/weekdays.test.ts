import {Fridays, Mondays, OnSpecificWeekday, Saturdays, Sundays, Thursdays, Tuesdays, Wednesdays} from "./weekdays"
import {parseISO} from "date-fns"
import {areIntervalsEqual} from "../functions/intervals"
import {Schedule} from "../index"

test('SpecificDay', () => {
    let schedule = OnSpecificWeekday(1, "Etc/UTC")
    let generator = schedule(parseISO("2020-09-23"))

    let entry = generator.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2020-09-28T00:00Z"),
        end: parseISO("2020-09-29T00:00Z")
    })).toStrictEqual(true)

    entry = generator.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2020-10-05T00:00Z"),
        end: parseISO("2020-10-06T00:00Z")
    })).toStrictEqual(true)
})

test('SpecificDay with timezone', () => {
    let schedule = OnSpecificWeekday(1, "Europe/Berlin")
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

    schedule = Mondays("Etc/UTC")
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-28T00:00Z"),
        end: parseISO("2020-09-29T00:00Z")
    })).toStrictEqual(true)

    schedule = Tuesdays("Etc/UTC")
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-29T00:00Z"),
        end: parseISO("2020-09-30T00:00Z")
    })).toStrictEqual(true)

    schedule = Wednesdays("Etc/UTC")
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-09-30T00:00Z"),
        end: parseISO("2020-10-01T00:00Z")
    })).toStrictEqual(true)

    schedule = Thursdays("Etc/UTC")
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-01T00:00Z"),
        end: parseISO("2020-10-02T00:00Z")
    })).toStrictEqual(true)

    schedule = Fridays("Etc/UTC")
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-02T00:00Z"),
        end: parseISO("2020-10-03T00:00Z")
    })).toStrictEqual(true)

    schedule = Saturdays("Etc/UTC")
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-03T00:00Z"),
        end: parseISO("2020-10-04T00:00Z")
    })).toStrictEqual(true)

    schedule = Sundays("Etc/UTC")
    nextInterval = schedule(startDate).next().value
    expect(areIntervalsEqual(nextInterval, {
        start: parseISO("2020-10-04T00:00Z"),
        end: parseISO("2020-10-05T00:00Z")
    })).toStrictEqual(true)
})