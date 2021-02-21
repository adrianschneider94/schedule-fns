import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {From, Until} from "schedule.js/schedules"

test("From", () => {
    let startDate = LuxonImplementation.parseISO("2020-09-01T13:00Z")
    let schedule = From(LuxonImplementation)(startDate)

    let start = LuxonImplementation.parseISO("2020-09-01T14:00Z")
    let e1 = {start, end: Infinity}
    let e2 = {start: startDate, end: start}

    let generator = schedule(start)
    expect(generator.next().value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    generator = schedule(start, "backward")
    expect(generator.next().value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))
})

test("Until", () => {
    let endDate = LuxonImplementation.parseISO("2020-09-01T14:00Z")
    let schedule = Until(LuxonImplementation)(endDate)

    let start = LuxonImplementation.parseISO("2020-09-01T13:00Z")
    let e1 = {start: start, end: endDate}
    let e2 = {start: -Infinity, end: start}

    let generator = schedule(start)
    expect(generator.next().value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    generator = schedule(start, "backward")
    expect(generator.next().value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))
})