import {
    Fridays,
    Interval,
    intervalFromIntervalObject,
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
import {parseISO} from "schedule-fns/functions/misc"

test("SpecificDay", () => {
    let schedule = OnSpecificWeekday(1)
    let generator = schedule(parseISO("2020-09-23"))

    let e1 = {
        start: parseISO("2020-09-27T22:00Z"),
        end: parseISO("2020-09-28T22:00Z")
    }

    let e2 = {
        start: parseISO("2020-10-04T22:00Z"),
        end: parseISO("2020-10-05T22:00Z")
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))
})

test("Specific Day in Tokyo", () => {
    let schedule = OnSpecificWeekday(1, {timeZone: "Asia/Tokyo"})
    let generator = schedule(parseISO("2020-01-01T00:00+09:00"))

    let e1 = {
        start: parseISO("2020-01-07T00:00+09:00"),
        end: parseISO("2020-01-08T00:00+09:00")
    }

    let e2 = {
        start: parseISO("2020-01-14T00:00+09:00"),
        end: parseISO("2020-01-15T00:00+09:00")
    }

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))
})

test("Weekdays", () => {
    let schedule: Schedule
    let nextInterval: Interval
    let startDate = parseISO("2020-09-28T00:00Z")

    schedule = Mondays()

    let e1 = {
        start: parseISO("2020-09-28T00:00Z"),
        end: parseISO("2020-09-28T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    schedule = Tuesdays()

    let e2 = {
        start: parseISO("2020-09-28T22:00Z"),
        end: parseISO("2020-09-29T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e2))

    schedule = Wednesdays()
    let e3 = {
        start: parseISO("2020-09-29T22:00Z"),
        end: parseISO("2020-09-30T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e3))

    schedule = Thursdays()

    let e4 = {
        start: parseISO("2020-09-30T22:00Z"),
        end: parseISO("2020-10-01T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e4))

    schedule = Fridays()

    let e5 = {
        start: parseISO("2020-10-01T22:00Z"),
        end: parseISO("2020-10-02T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e5))

    schedule = Saturdays()

    let e6 = {
        start: parseISO("2020-10-02T22:00Z"),
        end: parseISO("2020-10-03T22:00Z")
    }

    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e6))


    schedule = Sundays()

    let e7 = {
        start: parseISO("2020-10-03T22:00Z"),
        end: parseISO("2020-10-04T22:00Z")
    }
    nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e7))

})

test("Weekends", () => {
    let schedule = Weekends()
    let startDate = parseISO("2020-09-28T00:00Z")

    let e1 = {
        start: parseISO("2020-10-02T22:00Z"),
        end: parseISO("2020-10-04T22:00Z")
    }
    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e1))
})

test("WorkingDays", () => {
    let schedule = WorkingDays()
    let startDate = parseISO("2020-09-28T00:00Z")

    let e1 = {
        start: parseISO("2020-09-28T00:00Z"),
        end: parseISO("2020-10-02T22:00Z")
    }

    let nextInterval = schedule(startDate).next().value
    expect(nextInterval).toBeSameIntervalAs(intervalFromIntervalObject(e1))
})