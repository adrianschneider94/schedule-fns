import {ScheduleFromIntervals} from "./schedules"
import {intersectSchedules, invertSchedule, joinSchedules, subtractSchedules} from "./operations"
import {areIntervalsEqual} from "./functions"

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

test('Subtract schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 10})
    let schedule2 = ScheduleFromIntervals({start: 2, end: 3}, {start: 4, end: 5})
    let subtractedSchedule = subtractSchedules(schedule1, schedule2)

    let generator = subtractedSchedule(0)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 2})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 3, end: 4})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 5, end: 10})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})