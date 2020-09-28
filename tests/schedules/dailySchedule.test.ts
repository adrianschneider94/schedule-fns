import {parseISO} from "date-fns"

import {DailySchedule} from "schedule-fns"
import {areIntervalsEqual} from "schedule-fns/functions/intervals"

test('Daily schedule', () => {
    let schedule = DailySchedule("8:00", "16:00", {timeZone: "Europe/Berlin"})
    let generator = schedule(new Date("2020-01-01T20:00"))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-02T07:00Z"),
        end: parseISO("2020-01-02T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-03T07:00Z"),
        end: parseISO("2020-01-03T15:00Z")
    })).toStrictEqual(true)
})

test('Daily schedule without options', () => {
    expect(() => {
        DailySchedule("8:00", "16:00")
    }).not.toThrowError()

})

test('Daily schedule UTC', () => {
    let schedule = DailySchedule("08:00", "16:00", {timeZone: "Etc/UTC"})
    let generator = schedule(parseISO("2020-01-01T20:00:00.000Z"))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-02T08:00Z"),
        end: parseISO("2020-01-02T16:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-03T08:00Z"),
        end: parseISO("2020-01-03T16:00Z")
    })).toStrictEqual(true)
})


// Bug is in date-fns-tz (https://github.com/marnusw/date-fns-tz/issues/82)
xtest('Daily schedule: DST switch', () => {
    let schedule = DailySchedule("01:00", "05:00", {timeZone: "Europe/Berlin"})
    let generator = schedule(new Date("2020-03-27T20:00"))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-03-28T00:00Z"),
        end: parseISO("2020-03-28T04:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-03-29T00:00Z"),
        end: parseISO("2020-03-29T03:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-03-29T23:00Z"),
        end: parseISO("2020-03-30T03:00Z")
    })).toStrictEqual(true)
})

test('Daily schedule: Start in first interval', () => {
    let schedule = DailySchedule("08:00", "16:00", {timeZone: "Europe/Berlin"})
    let generator = schedule(new Date("2020-01-01T10:00Z"))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-01T10:00Z"),
        end: parseISO("2020-01-01T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-02T07:00Z"),
        end: parseISO("2020-01-02T15:00Z")
    })).toStrictEqual(true)
})

test('Daily schedule: Start before first interval', () => {
    let schedule = DailySchedule("08:00", "16:00", {timeZone: "Europe/Berlin"})
    let generator = schedule(new Date("2020-01-01T01:00Z"))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-01T07:00Z"),
        end: parseISO("2020-01-01T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-02T07:00Z"),
        end: parseISO("2020-01-02T15:00Z")
    })).toStrictEqual(true)
})

test('Daily schedule: Custom time format', () => {
    let schedule = DailySchedule("8 AM", "4 PM", {timeZone: "Europe/Berlin", timeFormat: "h a"})
    let generator = schedule(new Date("2020-01-01T10:00Z"))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-01T10:00Z"),
        end: parseISO("2020-01-01T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-02T07:00Z"),
        end: parseISO("2020-01-02T15:00Z")
    })).toStrictEqual(true)
})


test('Daily schedule: Format with timezone raises error', () => {
    let schedule = DailySchedule("08:00", "16:00", {timeZone: "Europe/Berlin", timeFormat: "HH:mmX"})
    let generator = schedule(new Date("2020-01-01T10:00Z"))

    expect(() => generator.next()).toThrowError()
})


test('Daily schedule: Backward', () => {
    let schedule = DailySchedule("08:00", "16:00", {timeZone: "Europe/Berlin", timeFormat: "HH:mm"})
    let generator = schedule(new Date("2020-01-01T10:00Z"), "backward")

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-01T07:00Z"),
        end: parseISO("2020-01-01T10:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2019-12-31T07:00Z"),
        end: parseISO("2019-12-31T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2019-12-30T07:00Z"),
        end: parseISO("2019-12-30T15:00Z")
    })).toStrictEqual(true)
})

test('Daily schedule: Backward, first interval before startDate', () => {
    let schedule = DailySchedule("08:00", "16:00", {timeZone: "Europe/Berlin", timeFormat: "HH:mm"})
    let generator = schedule(new Date("2020-01-01T17:00Z"), "backward")

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-01T07:00Z"),
        end: parseISO("2020-01-01T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2019-12-31T07:00Z"),
        end: parseISO("2019-12-31T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2019-12-30T07:00Z"),
        end: parseISO("2019-12-30T15:00Z")
    })).toStrictEqual(true)
})

test('Daily schedule over midnight', () => {
    let schedule = DailySchedule("08:00", "02:00", {timeZone: "Etc/UTC"})
    let generator = schedule(new Date("2020-01-01T00:00Z"))

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-01T00:00Z"),
        end: parseISO("2020-01-01T02:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-01T08:00Z"),
        end: parseISO("2020-01-02T02:00Z")
    })).toStrictEqual(true)
})