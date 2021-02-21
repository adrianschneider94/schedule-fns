import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {ScheduleFromIntervals} from "schedule.js/schedules"

test("Basic schedule from intervals", () => {
    let startDate = 0
    let intervals = [
        LuxonImplementation.intervalFromIntervalObject({start: 0, end: 10}),
        LuxonImplementation.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(LuxonImplementation)(...intervals)
    let generator = schedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 0, end: 10}
    let e2 = {start: 20, end: 30}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Schedule from empty list of intervals", () => {
    let startDate = 0
    let schedule = ScheduleFromIntervals(LuxonImplementation)()
    let generator = schedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Schedule from intervals with startDate in interval", () => {
    let startDate = 25
    let intervals = [
        LuxonImplementation.intervalFromIntervalObject({start: 0, end: 10}),
        LuxonImplementation.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(LuxonImplementation)(...intervals)
    let generator = schedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 25, end: 30}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Schedule from intervals with startDate after all intervals", () => {
    let startDate = 35
    let intervals = [
        LuxonImplementation.intervalFromIntervalObject({start: 0, end: 10}),
        LuxonImplementation.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(LuxonImplementation)(...intervals)
    let generator = schedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Basic schedule from intervals, reverse direction", () => {
    let startDate = 50
    let intervals = [
        LuxonImplementation.intervalFromIntervalObject({start: 0, end: 10}),
        LuxonImplementation.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(LuxonImplementation)(...intervals)
    let generator = schedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate), "backward")

    let e1 = {start: 20, end: 30}
    let e2 = {start: 0, end: 10}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Basic schedule from intervals, reverse direction, startDate in interval", () => {
    let startDate = 25
    let intervals = [
        LuxonImplementation.intervalFromIntervalObject({start: 0, end: 10}),
        LuxonImplementation.intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(LuxonImplementation)(...intervals)
    let generator = schedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate), "backward")

    let e1 = {start: 20, end: 25}
    let e2 = {start: 0, end: 10}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})