import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("Basic schedule from intervals", (lib) => {
    let startDate = 0
    let intervals = [
        lib.intervalFromIntervalObject({start: 0, end: 10}),
        lib.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = lib.ScheduleFromIntervals(...intervals)
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 0, end: 10}
    let e2 = {start: 20, end: 30}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Schedule from empty list of intervals", (lib) => {
    let startDate = 0
    let schedule = lib.ScheduleFromIntervals()
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Schedule from intervals with startDate in interval", (lib) => {
    let startDate = 25
    let intervals = [
        lib.intervalFromIntervalObject({start: 0, end: 10}),
        lib.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = lib.ScheduleFromIntervals(...intervals)
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 25, end: 30}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Schedule from intervals with startDate after all intervals", (lib) => {
    let startDate = 35
    let intervals = [
        lib.intervalFromIntervalObject({start: 0, end: 10}),
        lib.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = lib.ScheduleFromIntervals(...intervals)
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Basic schedule from intervals, reverse direction", (lib) => {
    let startDate = 50
    let intervals = [
        lib.intervalFromIntervalObject({start: 0, end: 10}),
        lib.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = lib.ScheduleFromIntervals(...intervals)
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate), "backward")

    let e1 = {start: 20, end: 30}
    let e2 = {start: 0, end: 10}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Basic schedule from intervals, reverse direction, startDate in interval", (lib) => {
    let startDate = 25
    let intervals = [
        lib.intervalFromIntervalObject({start: 0, end: 10}),
        lib.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = lib.ScheduleFromIntervals(...intervals)
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate), "backward")

    let e1 = {start: 20, end: 25}
    let e2 = {start: 0, end: 10}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})