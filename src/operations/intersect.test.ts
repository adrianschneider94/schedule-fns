import {intersectSchedules} from "./intersect"
import {RegularSchedule, ScheduleFromIntervals} from "../schedules"
import {areIntervalsEqual} from "../functions/intervals"

test('Intersect no schedules', () => {
    let intersectedSchedule = intersectSchedules()
    let generator = intersectedSchedule(0)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Intersect single schedule', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 1}, {start: 2, end: 3})
    let intersectedSchedule = intersectSchedules(schedule)
    let generator = intersectedSchedule(0)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 1})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 2, end: 3})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Intersect two simple schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 2})
    let schedule2 = ScheduleFromIntervals({start: 1, end: 3})
    let intersectedSchedule = intersectSchedules(schedule1, schedule2)

    let generator = intersectedSchedule(0)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 1, end: 2})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Intersect two schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 10})
    let schedule2 = ScheduleFromIntervals({start: 1, end: 2}, {start: 3, end: 4})
    let intersectedSchedule = intersectSchedules(schedule1, schedule2)

    let generator = intersectedSchedule(0)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 1, end: 2})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 3, end: 4})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Intersect two disjoint schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 1})
    let schedule2 = ScheduleFromIntervals({start: 2, end: 3}, {start: 4, end: 5})
    let intersectedSchedule = intersectSchedules(schedule1, schedule2)

    let generator = intersectedSchedule(0)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Intersect schedules: Reach maximal number of recursions', () => {
    let schedule1 = RegularSchedule(0, {seconds: 0.5}, {seconds: 2})
    let schedule2 = RegularSchedule(1000, {seconds: 0.5}, {seconds: 2})
    let intersectedSchedule = intersectSchedules(schedule1, schedule2)
    let generator = intersectedSchedule(0)

    expect(() => generator.next()).toThrowError()
})