import {DailyScheduleWithTimezone, RegularSchedule, ScheduleFromIntervals} from "./schedules"
import {areIntervalsEqual} from "./functions"
import {parseISO} from "date-fns"

test('Basic schedule from intervals', () => {
    let intervals = [{start: 0, end: 10}, {start: 20, end: 30}]
    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(0)
    expect(generator.next()).toStrictEqual({value: {start: 0, end: 10}, done: false})
    expect(generator.next()).toStrictEqual({value: {start: 20, end: 30}, done: false})
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from empty list of intervals', () => {
    let schedule = ScheduleFromIntervals()
    let generator = schedule(0)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from intervals with startDate in interval', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 20, end: 30})
    let generator = schedule(25)
    expect(generator.next()).toStrictEqual({value: {start: 25, end: 30}, done: false})
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from intervals with startDate after all intervals', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 20, end: 30})
    let generator = schedule(35)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('RegularSchedule', () => {
    let schedule = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let generator = schedule(0)

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 0, end: 1000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 2000, end: 3000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 4000, end: 5000})).toBeTruthy()
})

test('RegularSchedule with offset start 1', () => {
    let schedule = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let generator = schedule(5500)

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 6000, end: 7000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 8000, end: 9000})).toBeTruthy()
})

test('RegularSchedule with offset start 2', () => {
    let schedule = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let generator = schedule(500)

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 500, end: 1000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 2000, end: 3000})).toBeTruthy()
})

test('Daily schedule with timezone', () => {
    let schedule = DailyScheduleWithTimezone("08:00", "16:00", "Europe/Berlin")
    let generator = schedule(new Date("2020-01-01T20:00"))

    let value = generator.next()
    console.log(value)
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-02T07:00Z"),
        end: parseISO("2020-01-02T15:00Z")
    })).toStrictEqual(true)

    value = generator.next()
    console.log(value)
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {
        start: parseISO("2020-01-03T07:00Z"),
        end: parseISO("2020-01-03T15:00Z")
    })).toStrictEqual(true)
})

test('Daily schedule with timezone: DST switch', () => {
    let schedule = DailyScheduleWithTimezone("01:00", "05:00", "Europe/Berlin")
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

test('Daily schedule with timezone: Start in first interval', () => {
    let schedule = DailyScheduleWithTimezone("08:00", "16:00", "Europe/Berlin")
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

test('Daily schedule with timezone: Start before first interval', () => {
    let schedule = DailyScheduleWithTimezone("08:00", "16:00", "Europe/Berlin")
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

test('Daily schedule with timezone: Custom time format', () => {
    let schedule = DailyScheduleWithTimezone("8 AM", "4 PM", "Europe/Berlin", "h a")
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


test('Daily schedule with timezone: Format with timezone raises error', () => {
    let schedule = DailyScheduleWithTimezone("08:00", "16:00", "Europe/Berlin", "HH:mmX")
    let generator = schedule(new Date("2020-01-01T10:00Z"))

    expect(() => generator.next()).toThrowError()
})