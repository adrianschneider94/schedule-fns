import {LuxonScheduleFns as lib} from "schedule.js"


test("Invert simple schedule", () => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 20, end: 30}
    let startDate = 0
    let e1 = {start: 10, end: 20}
    let e2 = {start: 30, end: Infinity}

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))
    let invertedSchedule = lib.invertSchedule(schedule)

    let generator = invertedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Invert empty schedule", () => {
    let startDate = 0
    let e = {start: 0, end: Infinity}

    let schedule = lib.ScheduleFromIntervals()
    let invertedSchedule = lib.invertSchedule(schedule)
    let generator = invertedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let x1 = generator.next()
    expect(x1.done).toBe(false)
    expect(x1.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})


test("Invert schedule with first interval after startDate", () => {
    let i = {start: 0, end: 20}
    let startDate = -20

    let e1 = {start: -20, end: 0}
    let e2 = {start: 20, end: Infinity}


    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i))
    let invertedSchedule = lib.invertSchedule(schedule)
    let generator = invertedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Invert schedule with infinity", () => {
    let i = {start: 0, end: Infinity}
    let startDate = 0

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i))
    let invertedSchedule = lib.invertSchedule(schedule)
    let generator = invertedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Invert schedule, reverse order", () => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 20, end: 30}
    let startDate = 50

    let e1 = {start: 30, end: 50}
    let e2 = {start: 10, end: 20}
    let e3 = {start: -Infinity, end: 0}

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))
    let invertedSchedule = lib.invertSchedule(schedule)
    let generator = invertedSchedule(lib.dateTimeFromDateOrNumber(startDate), "backward")

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e3))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Invert empty schedule, reverse direction", () => {
    let startDate = 50
    let e1 = {start: -Infinity, end: 50}

    let schedule = lib.ScheduleFromIntervals()
    let invertedSchedule = lib.invertSchedule(schedule)
    let generator = invertedSchedule(lib.dateTimeFromDateOrNumber(startDate), "backward")
    let x1 = generator.next()

    expect(x1.done).toBe(false)
    expect(x1.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

