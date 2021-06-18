import {LuxonScheduleFns as lib, Schedule} from "schedule.js"
import {DateTime, Duration, Interval} from "luxon"

test("SpecificDay", () => {
    let schedule = lib.OnSpecificWeekday(1)
    let generator = schedule(DateTime.fromISO("2020-09-23"))

    let e1 = {
        start: DateTime.fromISO("2020-09-27T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-09-28T22:00Z").toMillis()
    }

    let e2 = {
        start: DateTime.fromISO("2020-10-04T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-10-05T22:00Z").toMillis()
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))
})

test("Specific Day in Tokyo", () => {
    let schedule = lib.OnSpecificWeekday(1, {timeZone: "Asia/Tokyo"})
    let generator = schedule(DateTime.fromISO("2020-01-01T00:00+09:00"))

    let e1 = {
        start: DateTime.fromISO("2020-01-07T00:00+09:00").toMillis(),
        end: DateTime.fromISO("2020-01-08T00:00+09:00").toMillis()
    }

    let e2 = {
        start: DateTime.fromISO("2020-01-14T00:00+09:00").toMillis(),
        end: DateTime.fromISO("2020-01-15T00:00+09:00").toMillis()
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))
})

test("Weekdays", () => {
    let schedule: Schedule<DateTime, Interval, Duration>
    let nextInterval: Interval
    let startDate = DateTime.fromISO("2020-09-28T00:00Z")

    schedule = lib.Mondays()

    let e1 = {
        start: DateTime.fromISO("2020-09-28T00:00Z").toMillis(),
        end: DateTime.fromISO("2020-09-28T22:00Z").toMillis()
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    schedule = lib.Tuesdays()

    let e2 = {
        start: DateTime.fromISO("2020-09-28T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-09-29T22:00Z").toMillis()
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    schedule = lib.Wednesdays()
    let e3 = {
        start: DateTime.fromISO("2020-09-29T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-09-30T22:00Z").toMillis()
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e3))

    schedule = lib.Thursdays()

    let e4 = {
        start: DateTime.fromISO("2020-09-30T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-10-01T22:00Z").toMillis()
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e4))

    schedule = lib.Fridays()

    let e5 = {
        start: DateTime.fromISO("2020-10-01T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-10-02T22:00Z").toMillis()
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e5))

    schedule = lib.Saturdays()

    let e6 = {
        start: DateTime.fromISO("2020-10-02T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-10-03T22:00Z").toMillis()
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e6))


    schedule = lib.Sundays()

    let e7 = {
        start: DateTime.fromISO("2020-10-03T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-10-04T22:00Z").toMillis()
    }
    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e7))

})

test("Weekends", () => {
    let schedule = lib.Weekends()
    let startDate = DateTime.fromISO("2020-09-28T00:00Z")

    let e1 = {
        start: DateTime.fromISO("2020-10-02T22:00Z").toMillis(),
        end: DateTime.fromISO("2020-10-04T22:00Z").toMillis()
    }
    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))
})

test("WorkingDays", () => {
    let schedule = lib.WorkingDays()
    let startDate = DateTime.fromISO("2020-09-28T00:00Z")

    let e1 = {
        start: DateTime.fromISO("2020-09-28T00:00Z").toMillis(),
        end: DateTime.fromISO("2020-10-02T22:00Z").toMillis()
    }

    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))
})