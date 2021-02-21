import {intersectSchedules} from "schedule.js/operations"
import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {RegularSchedule, ScheduleFromIntervals} from "schedule.js/schedules"

test("Intersect no schedules", () => {
    let startDate = 0
    let intersectedSchedule = intersectSchedules(LuxonImplementation)()
    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Intersect single schedule", () => {
    let i1 = {start: 0, end: 1}
    let i2 = {start: 2, end: 3}

    let startDate = 0

    let e1 = {start: 0, end: 1}
    let e2 = {start: 2, end: 3}

    let schedule = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1), LuxonImplementation.intervalFromIntervalObject(i2))
    let intersectedSchedule = intersectSchedules(LuxonImplementation)(schedule)
    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Intersect two simple schedules", () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}

    let startDate = 0
    let e1 = {start: 1, end: 2}

    let schedule1 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1))
    let schedule2 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i2))
    let intersectedSchedule = intersectSchedules(LuxonImplementation)(schedule1, schedule2)

    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Intersect two simple schedules, reverse direction", () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}

    let startDate = 4

    let e1 = {start: 1, end: 2}

    let schedule1 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1))
    let schedule2 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i2))
    let intersectedSchedule = intersectSchedules(LuxonImplementation)(schedule1, schedule2)

    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate), "backward")

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Intersect two schedules", () => {
    let i1 = {start: 0, end: 10}
    let i2_1 = {start: 1, end: 2}
    let i2_2 = {start: 3, end: 4}
    let startDate = 0
    let e1 = {start: 1, end: 2}
    let e2 = {start: 3, end: 4}

    let schedule1 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1))
    let schedule2 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i2_1), LuxonImplementation.intervalFromIntervalObject(i2_2))
    let intersectedSchedule = intersectSchedules(LuxonImplementation)(schedule1, schedule2)

    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Intersect two schedules, reverse direction", () => {
    let i1_1 = {start: -5, end: -2}
    let i1_2 = {start: 0, end: 10}

    let i2_1 = {start: 1, end: 2}
    let i2_2 = {start: 3, end: 4}
    let i2_3 = {start: 12, end: 13}

    let startDate = 12.5

    let e1 = {start: 3, end: 4}
    let e2 = {start: 1, end: 2}

    let schedule1 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1_1), LuxonImplementation.intervalFromIntervalObject(i1_2))
    let schedule2 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i2_1), LuxonImplementation.intervalFromIntervalObject(i2_2), LuxonImplementation.intervalFromIntervalObject(i2_3))
    let intersectedSchedule = intersectSchedules(LuxonImplementation)(schedule1, schedule2)

    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate), "backward")

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Intersect two disjoint schedules", () => {
    let i1_1 = {start: 0, end: 1}
    let i2_1 = {start: 2, end: 3}
    let i2_2 = {start: 4, end: 5}
    let startDate = 0

    let schedule1 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1_1))
    let schedule2 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i2_1), LuxonImplementation.intervalFromIntervalObject(i2_2))
    let intersectedSchedule = intersectSchedules(LuxonImplementation)(schedule1, schedule2)

    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test("Intersect schedules: Reach maximal number of recursions", () => {
    let startMoment1 = 0
    let startMoment2 = 1000
    let duration = {seconds: 0.5}
    let period = {seconds: 2}
    let startDate = 0

    let schedule1 = RegularSchedule(LuxonImplementation)(LuxonImplementation.dateTimeFromDateOrNumber(startMoment1), LuxonImplementation.durationFromDurationObject(duration), LuxonImplementation.durationFromDurationObject(period))
    let schedule2 = RegularSchedule(LuxonImplementation)(LuxonImplementation.dateTimeFromDateOrNumber(startMoment2), LuxonImplementation.durationFromDurationObject(duration), LuxonImplementation.durationFromDurationObject(period))
    let intersectedSchedule = intersectSchedules(LuxonImplementation)(schedule1, schedule2)
    let generator = intersectedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    expect(() => generator.next()).toThrowError()
})