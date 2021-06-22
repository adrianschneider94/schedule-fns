import each from "jest-each"
import {implementation} from "../jest.setup"
import {LuxonScheduleFns} from "schedule.js/luxon/implementation"

each(implementation).test("Daily schedule", (lib) => {
    let startDate = "2020-01-01T20:00:00Z"

    let e1 = {
        start: "2020-01-02T08:00+0100",
        end: "2020-01-02T16:00+0100"
    }

    let e2 = {
        start: "2020-01-03T08:00+0100",
        end: "2020-01-03T16:00+0100"
    }

    let schedule = lib.DailySchedule("08:00", "16:00")
    let generator = schedule(lib.parseISO(startDate))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))
})

each([LuxonScheduleFns]).test("Daily schedule in Tokyo", (lib) => {
    let startDate = "2020-01-01T20:00+09:00"

    let e1 = {
        start: "2020-01-02T08:00+09:00",
        end: "2020-01-02T16:00+09:00"
    }

    let e2 = {
        start: "2020-01-03T08:00+09:00",
        end: "2020-01-03T16:00+09:00"
    }

    let schedule = lib.DailySchedule("08:00", "16:00", {timeZone: "Asia/Tokyo"})
    let generator = schedule(lib.parseISO(startDate))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))
})

each(implementation).test("Daily schedule: DST switch", (lib) => {
    let startDate = "2020-03-27T20:00"
    let schedule = lib.DailySchedule("01:00", "05:00")
    let generator = schedule(lib.parseISO(startDate))

    let e1 = {
        start: "2020-03-28T00:00Z",
        end: "2020-03-28T04:00Z"
    }

    let e2 = {
        start: "2020-03-29T00:00Z",
        end: "2020-03-29T03:00Z"
    }

    let e3 = {
        start: "2020-03-29T23:00Z",
        end: "2020-03-30T03:00Z"
    }

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e3))
})

each(implementation).test("Daily schedule: Start in first interval", (lib) => {
    let startDate = "2020-01-01T10:00Z"
    let schedule = lib.DailySchedule("08:00", "16:00")
    let generator = schedule(lib.parseISO(startDate))

    let e1 = {
        start: "2020-01-01T10:00Z",
        end: "2020-01-01T15:00Z"
    }

    let e2 = {
        start: "2020-01-02T07:00Z",
        end: "2020-01-02T15:00Z"
    }

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))

})

each(implementation).test("Daily schedule: Start before first interval", (lib) => {
    let startDate = "2020-01-01T01:00Z"
    let schedule = lib.DailySchedule("08:00", "16:00")
    let generator = schedule(lib.parseISO(startDate))

    let e1 = {
        start: "2020-01-01T07:00Z",
        end: "2020-01-01T15:00Z"
    }

    let e2 = {
        start: "2020-01-02T07:00Z",
        end: "2020-01-02T15:00Z"
    }

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))
})


each(implementation).test("Daily schedule: Backward", (lib) => {
    let startDate = "2020-01-01T10:00Z"
    let schedule = lib.DailySchedule("08:00", "16:00")
    let generator = schedule(lib.parseISO(startDate), "backward")

    let e1 = {
        start: "2020-01-01T07:00Z",
        end: "2020-01-01T10:00Z"
    }
    let e2 = {
        start: "2019-12-31T07:00Z",
        end: "2019-12-31T15:00Z"
    }

    let e3 = {
        start: "2019-12-30T07:00Z",
        end: "2019-12-30T15:00Z"
    }

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e3))
})

each(implementation).test("Daily schedule: Backward, first interval before startDate", (lib) => {
    let startDate = "2020-01-01T17:00Z"
    let schedule = lib.DailySchedule("08:00", "16:00")
    let generator = schedule(lib.parseISO(startDate), "backward")

    let e1 = {
        start: "2020-01-01T07:00Z",
        end: "2020-01-01T15:00Z"
    }
    let e2 = {
        start: "2019-12-31T07:00Z",
        end: "2019-12-31T15:00Z"
    }
    let e3 = {
        start: "2019-12-30T07:00Z",
        end: "2019-12-30T15:00Z"
    }


    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e3))
})

each(implementation).test("Daily schedule over midnight", (lib) => {
    let startDate = "2020-01-01T00:00Z"
    let schedule = lib.DailySchedule("08:00", "02:00")
    let generator = schedule(lib.parseISO(startDate))

    let e1 = {
        start: "2020-01-01T00:00Z",
        end: "2020-01-01T01:00Z"
    }
    let e2 = {
        start: "2020-01-01T07:00Z",
        end: "2020-01-02T01:00Z"
    }

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))
})