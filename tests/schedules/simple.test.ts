import {From, Until} from "schedule-fns"
import {intervalFromIntervalObject} from "schedule-fns/functions/intervals"
import {parseISO} from "schedule-fns/functions/misc"

test('From', () => {
    let startDate = parseISO("2020-09-01T13:00Z")
    let schedule = From(startDate)

    let start = parseISO("2020-09-01T14:00Z")
    let e1 = {start, end: Infinity}
    let e2 = {start: startDate, end: start}

    let generator = schedule(start)
    expect(generator.next().value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    generator = schedule(start, "backward")
    expect(generator.next().value).toBeSameIntervalAs(intervalFromIntervalObject(e2))
})

test('Until', () => {
    let endDate = parseISO("2020-09-01T14:00Z")
    let schedule = Until(endDate)

    let start = parseISO("2020-09-01T13:00Z")
    let e1 = {start: start, end: endDate}
    let e2 = {start: -Infinity, end: start}

    let generator = schedule(start)
    expect(generator.next().value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    generator = schedule(start, "backward")
    expect(generator.next().value).toBeSameIntervalAs(intervalFromIntervalObject(e2))
})