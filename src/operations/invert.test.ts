import {ScheduleFromIntervals} from "../schedules"
import {invertSchedule} from "./invert"
import {areIntervalsEqual} from "../functions/intervals"

test('Invert simple schedule', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 20, end: 30})
    let invertedSchedule = invertSchedule(schedule)
    let generator = invertedSchedule(0)
    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 10, end: 20})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 30, end: Infinity})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Invert empty schedule', () => {
    let schedule = ScheduleFromIntervals()
    let invertedSchedule = invertSchedule(schedule)
    let generator = invertedSchedule(0)
    let x1 = generator.next()
    expect(x1.done).toBe(false)
    expect(areIntervalsEqual(x1.value, {start: 0, end: Infinity})).toBe(true)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})


test("Invert schedule with first interval after startDate", () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 20})
    let invertedSchedule = invertSchedule(schedule)
    let generator = invertedSchedule(-20)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: -20, end: 0})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 20, end: Infinity})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Invert schedule with infinity", () => {
    let schedule = ScheduleFromIntervals({start: 0, end: Infinity})
    let invertedSchedule = invertSchedule(schedule)
    let generator = invertedSchedule(0)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Invert schedule, reverse order", () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 20, end: 30})
    let invertedSchedule = invertSchedule(schedule)
    let generator = invertedSchedule(50, "backward")

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 30, end: 50})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 10, end: 20})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: -Infinity, end: 0})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Invert empty schedule, reverse direction', () => {
    let schedule = ScheduleFromIntervals()
    let invertedSchedule = invertSchedule(schedule)
    let generator = invertedSchedule(50, "backward")
    let x1 = generator.next()

    expect(x1.done).toBe(false)
    expect(areIntervalsEqual(x1.value, {start: -Infinity, end: 50})).toBe(true)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

