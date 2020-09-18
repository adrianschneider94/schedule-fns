import {RegularSchedule, ScheduleFromIntervals} from "./schedules"
import {areIntervalsEqual} from "./functions"

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