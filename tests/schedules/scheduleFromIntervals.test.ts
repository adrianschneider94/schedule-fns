import {ScheduleFromIntervals} from "schedule-fns"
import {intervalFromIntervalObject} from "schedule-fns/functions/intervals"
import {dateTimeFromDateOrNumber} from "schedule-fns/functions/misc"

test('Basic schedule from intervals', () => {
    let startDate = 0
    let intervals = [
        intervalFromIntervalObject({start: 0, end: 10}),
        intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 0, end: 10}
    let e2 = {start: 20, end: 30}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from empty list of intervals', () => {
    let startDate = 0
    let schedule = ScheduleFromIntervals()
    let generator = schedule(dateTimeFromDateOrNumber(startDate))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from intervals with startDate in interval', () => {
    let startDate = 25
    let intervals = [
        intervalFromIntervalObject({start: 0, end: 10}),
        intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 25, end: 30}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from intervals with startDate after all intervals', () => {
    let startDate = 35
    let intervals = [
        intervalFromIntervalObject({start: 0, end: 10}),
        intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(dateTimeFromDateOrNumber(startDate))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Basic schedule from intervals, reverse direction', () => {
    let startDate = 50
    let intervals = [
        intervalFromIntervalObject({start: 0, end: 10}),
        intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(dateTimeFromDateOrNumber(startDate), "backward")

    let e1 = {start: 20, end: 30}
    let e2 = {start: 0, end: 10}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Basic schedule from intervals, reverse direction, startDate in interval', () => {
    let startDate = 25
    let intervals = [
        intervalFromIntervalObject({start: 0, end: 10}),
        intervalFromIntervalObject({start: 20, end: 30})
    ]

    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(dateTimeFromDateOrNumber(startDate), "backward")

    let e1 = {start: 20, end: 25}
    let e2 = {start: 0, end: 10}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})