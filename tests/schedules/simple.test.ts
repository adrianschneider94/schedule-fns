import {parseISO} from "date-fns"
import {From, Until} from "schedule-fns"
import {areIntervalsEqual} from "schedule-fns/functions/intervals"

test('From', () => {
    let startDate = parseISO("2020-09-01T13:00Z")
    let schedule = From(startDate)

    let start = parseISO("2020-09-01T14:00Z")
    let generator = schedule(start)
    expect(areIntervalsEqual(generator.next().value, {start, end: Infinity})).toStrictEqual(true)

    generator = schedule(start, "backward")
    expect(areIntervalsEqual(generator.next().value, {start: startDate, end: start})).toStrictEqual(true)
})

test('Until', () => {
    let endDate = parseISO("2020-09-01T14:00Z")
    let schedule = Until(endDate)

    let start = parseISO("2020-09-01T13:00Z")

    let generator = schedule(start)
    expect(areIntervalsEqual(generator.next().value, {start: start, end: endDate})).toStrictEqual(true)

    generator = schedule(start, "backward")
    expect(areIntervalsEqual(generator.next().value, {start: -Infinity, end: start})).toStrictEqual(true)
})