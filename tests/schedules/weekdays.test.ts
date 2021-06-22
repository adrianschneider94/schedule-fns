import {LuxonScheduleFns, Schedule} from "schedule.js"
import {DateTime, Duration, Interval} from "luxon"
import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("SpecificDay", (lib) => {
    let schedule = lib.OnSpecificWeekday(1)
    let generator = schedule(lib.parseISO("2020-09-23"))

    let e1 = {
        start: "2020-09-27T22:00Z",
        end: "2020-09-28T22:00Z"
    }

    let e2 = {
        start: "2020-10-04T22:00Z",
        end: "2020-10-05T22:00Z"
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))
})

each([LuxonScheduleFns]).test("Specific Day in Tokyo", (lib) => {
    let schedule = lib.OnSpecificWeekday(1, {timeZone: "Asia/Tokyo"})
    let generator = schedule(lib.parseISO("2020-01-01T00:00+09:00"))

    let e1 = {
        start: "2020-01-07T00:00+09:00",
        end: "2020-01-08T00:00+09:00"
    }

    let e2 = {
        start: "2020-01-14T00:00+09:00",
        end: "2020-01-15T00:00+09:00"
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))
})

each(implementation).test("Weekdays", (lib) => {
    let schedule: Schedule<DateTime, Interval, Duration>
    let nextInterval: Interval
    let startDate = lib.parseISO("2020-09-28T00:00Z")

    schedule = lib.Mondays()

    let e1 = {
        start: "2020-09-28T00:00Z",
        end: "2020-09-28T22:00Z"
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    schedule = lib.Tuesdays()

    let e2 = {
        start: "2020-09-28T22:00Z",
        end: "2020-09-29T22:00Z"
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))

    schedule = lib.Wednesdays()
    let e3 = {
        start: "2020-09-29T22:00Z",
        end: "2020-09-30T22:00Z"
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e3))

    schedule = lib.Thursdays()

    let e4 = {
        start: "2020-09-30T22:00Z",
        end: "2020-10-01T22:00Z"
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e4))

    schedule = lib.Fridays()

    let e5 = {
        start: "2020-10-01T22:00Z",
        end: "2020-10-02T22:00Z"
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e5))

    schedule = lib.Saturdays()

    let e6 = {
        start: "2020-10-02T22:00Z",
        end: "2020-10-03T22:00Z"
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e6))


    schedule = lib.Sundays()

    let e7 = {
        start: "2020-10-03T22:00Z",
        end: "2020-10-04T22:00Z"
    }
    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e7))

})

each(implementation).test("Weekends", (lib) => {
    let schedule = lib.Weekends()
    let startDate = lib.parseISO("2020-09-28T00:00Z")

    let e1 = {
        start: "2020-10-02T22:00Z",
        end: "2020-10-04T22:00Z"
    }
    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))
})

each(implementation).test("WorkingDays", (lib) => {
    let schedule = lib.WorkingDays()
    let startDate = lib.parseISO("2020-09-28T00:00Z")

    let e1 = {
        start: "2020-09-28T00:00Z",
        end: "2020-10-02T22:00Z"
    }

    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))
})