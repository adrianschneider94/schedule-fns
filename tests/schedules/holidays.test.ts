import {parseISO} from "date-fns"

import {Holidays} from "schedule-fns"
import {areIntervalsEqual} from "schedule-fns/functions/intervals"

test('Holidays in Bavaria', () => {
    let schedule = Holidays("DE", "BY", {types: ["public"]})

    let gen = schedule(parseISO("2019-12-26T05:00:00.000+0100"))

    let entry = gen.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2019-12-26T04:00:00.000Z"),
        end: parseISO("2019-12-26T23:00:00.000Z")
    })).toStrictEqual(true)

    entry = gen.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2019-12-31T23:00:00.000Z"),
        end: parseISO("2020-01-01T23:00:00.000Z")
    })).toStrictEqual(true)

    entry = gen.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2020-01-05T23:00:00.000Z"),
        end: parseISO("2020-01-06T23:00:00.000Z")
    })).toStrictEqual(true)
})

test('Holidays in Bavaria, backward', () => {
    let schedule = Holidays("DE", "BY", {types: ["public"]})

    let gen = schedule(parseISO("2020-01-01T05:00:00.000+0100"), "backward")

    let entry = gen.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2019-12-31T23:00:00.000Z"),
        end: parseISO("2020-01-01T04:00:00.000Z")
    })).toStrictEqual(true)

    entry = gen.next()
    expect(entry.done).toBeFalsy()
    expect(areIntervalsEqual(entry.value, {
        start: parseISO("2019-12-24T23:00:00.000Z"),
        end: parseISO("2019-12-26T23:00:00.000Z")
    })).toStrictEqual(true)
})