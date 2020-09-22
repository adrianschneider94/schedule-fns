import {RegularSchedule, ScheduleFromIntervals} from "../schedules"
import {areIntervalsEqual} from "../functions/intervals"
import {DateInfinity, joinSchedules} from "../index"

test('Join single schedule', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 1}, {start: 2, end: 3})
    let joinedSchedule = joinSchedules(schedule)
    let generator = joinedSchedule(0)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 1})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 2, end: 3})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Join two simple schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 10}, {start: 19, end: 30})
    let schedule2 = ScheduleFromIntervals({start: 9, end: 20})
    let joinedSchedule = joinSchedules(schedule1, schedule2)

    let generator = joinedSchedule(0)
    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 30})).toBe(true)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Join three simple schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 1}, {start: 3, end: 4})
    let schedule2 = ScheduleFromIntervals({start: 1, end: 2}, {start: 5, end: 6})
    let schedule3 = ScheduleFromIntervals({start: 2, end: 3}, {start: 6, end: 7})
    let joinedSchedule = joinSchedules(schedule1, schedule2, schedule3)
    let generator = joinedSchedule(-10)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 4})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 5, end: 7})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Join two schedules (with infinity)', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: Infinity})
    let schedule2 = ScheduleFromIntervals({start: 1, end: 2})
    let joinedSchedule = joinSchedules(schedule1, schedule2)
    let generator = joinedSchedule(-10)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: Infinity})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Join two schedules (one long-running)', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 1000})
    let schedule2 = ScheduleFromIntervals(
        {start: 1, end: 2},
        {start: 3, end: 4},
        {start: 5, end: 6},
        {start: 7, end: 8}
    )
    let joinedSchedule = joinSchedules(schedule1, schedule2)
    let generator = joinedSchedule(-10)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 1000})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Join no schedules', () => {
    let joinedSchedule = joinSchedules()
    let generator = joinedSchedule(0)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Join schedules: Reach maximal number of recursions', () => {
    let schedule1 = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let schedule2 = ScheduleFromIntervals({start: -DateInfinity, end: DateInfinity - 1})
    let joinedSchedule = joinSchedules(schedule1, schedule2)
    let generator = joinedSchedule(0)
    expect(() => generator.next()).toThrowError()
})
