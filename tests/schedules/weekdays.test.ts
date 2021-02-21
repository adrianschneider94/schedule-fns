import {
    Fridays,
    Mondays,
    OnSpecificWeekday,
    Saturdays,
    Sundays,
    Thursdays,
    Tuesdays,
    Wednesdays,
    Weekends,
    WorkingDays
} from "schedule.js/schedules/weekdays"
import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {DateTime, Duration, Interval} from "luxon"
import {Schedule} from "schedule.js"

test("SpecificDay", () => {
    let schedule = OnSpecificWeekday(LuxonImplementation)(1)
    let generator = schedule(LuxonImplementation.parseISO("2020-09-23"))

    let e1 = {
        start: LuxonImplementation.parseISO("2020-09-27T22:00Z"),
        end: LuxonImplementation.parseISO("2020-09-28T22:00Z")
    }

    let e2 = {
        start: LuxonImplementation.parseISO("2020-10-04T22:00Z"),
        end: LuxonImplementation.parseISO("2020-10-05T22:00Z")
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))
})

test("Specific Day in Tokyo", () => {
    let schedule = OnSpecificWeekday(LuxonImplementation)(1, {timeZone: "Asia/Tokyo"})
    let generator = schedule(LuxonImplementation.parseISO("2020-01-01T00:00+09:00"))

    let e1 = {
        start: LuxonImplementation.parseISO("2020-01-07T00:00+09:00"),
        end: LuxonImplementation.parseISO("2020-01-08T00:00+09:00")
    }

    let e2 = {
        start: LuxonImplementation.parseISO("2020-01-14T00:00+09:00"),
        end: LuxonImplementation.parseISO("2020-01-15T00:00+09:00")
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))
})

test("Weekdays", () => {
    let schedule: Schedule<DateTime, Interval, Duration>
    let nextInterval: Interval
    let startDate = LuxonImplementation.parseISO("2020-09-28T00:00Z")

    schedule = Mondays(LuxonImplementation)()

    let e1 = {
        start: LuxonImplementation.parseISO("2020-09-28T00:00Z"),
        end: LuxonImplementation.parseISO("2020-09-28T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    schedule = Tuesdays(LuxonImplementation)()

    let e2 = {
        start: LuxonImplementation.parseISO("2020-09-28T22:00Z"),
        end: LuxonImplementation.parseISO("2020-09-29T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    schedule = Wednesdays(LuxonImplementation)()
    let e3 = {
        start: LuxonImplementation.parseISO("2020-09-29T22:00Z"),
        end: LuxonImplementation.parseISO("2020-09-30T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e3))

    schedule = Thursdays(LuxonImplementation)()

    let e4 = {
        start: LuxonImplementation.parseISO("2020-09-30T22:00Z"),
        end: LuxonImplementation.parseISO("2020-10-01T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e4))

    schedule = Fridays(LuxonImplementation)()

    let e5 = {
        start: LuxonImplementation.parseISO("2020-10-01T22:00Z"),
        end: LuxonImplementation.parseISO("2020-10-02T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e5))

    schedule = Saturdays(LuxonImplementation)()

    let e6 = {
        start: LuxonImplementation.parseISO("2020-10-02T22:00Z"),
        end: LuxonImplementation.parseISO("2020-10-03T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e6))


    schedule = Sundays(LuxonImplementation)()

    let e7 = {
        start: LuxonImplementation.parseISO("2020-10-03T22:00Z"),
        end: LuxonImplementation.parseISO("2020-10-04T22:00Z")
    }
    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e7))

})

test("Weekends", () => {
    let schedule = Weekends(LuxonImplementation)()
    let startDate = LuxonImplementation.parseISO("2020-09-28T00:00Z")

    let e1 = {
        start: LuxonImplementation.parseISO("2020-10-02T22:00Z"),
        end: LuxonImplementation.parseISO("2020-10-04T22:00Z")
    }
    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))
})

test("WorkingDays", () => {
    let schedule = WorkingDays(LuxonImplementation)()
    let startDate = LuxonImplementation.parseISO("2020-09-28T00:00Z")

    let e1 = {
        start: LuxonImplementation.parseISO("2020-09-28T00:00Z"),
        end: LuxonImplementation.parseISO("2020-10-02T22:00Z")
    }

    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))
})