import {LuxonScheduleFns as lib} from "schedule.js"
import {DateTime} from "luxon"

test("From", () => {
    let startDate = DateTime.fromISO("2020-09-01T13:00Z")
    let schedule = lib.From(startDate)

    let start = DateTime.fromISO("2020-09-01T14:00Z")
    let e1 = {start: start.toMillis(), end: Infinity}
    let e2 = {start: startDate.toMillis(), end: start.toMillis()}

    let generator = schedule(start)
    expect(generator.next().value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    generator = schedule(start, "backward")
    expect(generator.next().value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))
})

test("Until", () => {
    let endDate = DateTime.fromISO("2020-09-01T14:00Z")
    let schedule = lib.Until(endDate)

    let start = DateTime.fromISO("2020-09-01T13:00Z")
    let e1 = {start: start.toMillis(), end: endDate.toMillis()}
    let e2 = {start: -Infinity, end: start.toMillis()}

    let generator = schedule(start)
    expect(generator.next().value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    generator = schedule(start, "backward")
    expect(generator.next().value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))
})