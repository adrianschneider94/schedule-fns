import {LuxonScheduleFns as lib} from "schedule.js"
import {DateTime} from "luxon"

test("Holidays in Bavaria", () => {
    let schedule = lib.Holidays("DE", "BY", {types: ["public"]})

    let generator = schedule(DateTime.fromISO("2019-12-26T05:00:00.000+0100"))

    let e1 = {
        start: "2019-12-26T04:00:00.000Z",
        end: "2019-12-26T23:00:00.000Z"
    }
    let e2 = {
        start: "2019-12-31T23:00:00.000Z",
        end: "2020-01-01T23:00:00.000Z"
    }
    let e3 = {
        start: "2020-01-05T23:00:00.000Z",
        end: "2020-01-06T23:00:00.000Z"
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

test("Holidays in Bavaria, backward", () => {
    let schedule = lib.Holidays("DE", "BY", {types: ["public"]})

    let generator = schedule(DateTime.fromISO("2020-01-01T05:00:00.000+0100"), "backward")

    let e1 = {
        start: "2019-12-31T23:00:00.000Z",
        end: "2020-01-01T04:00:00.000Z"
    }

    let e2 = {
        start: "2019-12-24T23:00:00.000Z",
        end: "2019-12-26T23:00:00.000Z"
    }

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e1))

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(value.value).toBeSameIntervalAs(lib.intervalFromISOStrings(e2))
})