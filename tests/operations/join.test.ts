import each from "jest-each"
import {implementation} from "../jest.setup"


each(implementation).test("Join single schedule", (lib) => {
    let i1 = {start: 0, end: 1}
    let i2 = {start: 2, end: 3}
    let startDate = 0

    let e1 = {start: 0, end: 1}
    let e2 = {start: 2, end: 3}

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))
    let joinedSchedule = lib.joinSchedules(schedule)
    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Join two simple schedules", (lib) => {
    let i1_1 = {start: 0, end: 10}
    let i1_2 = {start: 19, end: 30}
    let i2 = {start: 9, end: 20}
    let startDate = 0

    let e1 = {start: 0, end: 30}

    let schedule1 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1_1), lib.intervalFromIntervalObject(i1_2))
    let schedule2 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i2))
    let joinedSchedule = lib.joinSchedules(schedule1, schedule2)

    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate))
    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Join three simple schedules", (lib) => {
    let i1_1 = {start: 0, end: 1}
    let i1_2 = {start: 3, end: 4}
    let i2_1 = {start: 1, end: 2}
    let i2_2 = {start: 5, end: 6}
    let i3_1 = {start: 2, end: 3}
    let i3_2 = {start: 6, end: 7}
    let startDate = -10
    let e1 = {start: 0, end: 4}
    let e2 = {start: 5, end: 7}

    let schedule1 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1_1), lib.intervalFromIntervalObject(i1_2))
    let schedule2 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i2_1), lib.intervalFromIntervalObject(i2_2))
    let schedule3 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i3_1), lib.intervalFromIntervalObject(i3_2))
    let joinedSchedule = lib.joinSchedules(schedule1, schedule2, schedule3)
    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Join three simple schedules, reverse order", (lib) => {
    let i1_1 = {start: 0, end: 10}
    let i1_2 = {start: 30, end: 40}

    let i2_1 = {start: 10, end: 20}
    let i2_2 = {start: 50, end: 60}

    let i3_1 = {start: 20, end: 30}
    let i3_2 = {start: 60, end: 70}

    let startDate = 65

    let e1 = {start: 50, end: 65}
    let e2 = {start: 0, end: 40}

    let schedule1 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1_1), lib.intervalFromIntervalObject(i1_2))
    let schedule2 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i2_1), lib.intervalFromIntervalObject(i2_2))
    let schedule3 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i3_1), lib.intervalFromIntervalObject(i3_2))
    let joinedSchedule = lib.joinSchedules(schedule1, schedule2, schedule3)
    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate), "backward")

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Join two schedules (with infinity)", (lib) => {
    let i1 = {start: 0, end: Infinity}
    let i2 = {start: 1, end: 2}
    let startDate = -10
    let e1 = {start: 0, end: Infinity}

    let schedule1 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1))
    let schedule2 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i2))
    let joinedSchedule = lib.joinSchedules(schedule1, schedule2)
    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Join two schedules (one long-running)", (lib) => {
    let i1 = {start: 0, end: 1000}
    let i2_1 = {start: 1, end: 2}
    let i2_2 = {start: 3, end: 4}
    let i2_3 = {start: 5, end: 6}
    let i2_4 = {start: 7, end: 8}
    let startDate = -10
    let e1 = {start: 0, end: 1000}

    let schedule1 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1))
    let schedule2 = lib.ScheduleFromIntervals(
        lib.intervalFromIntervalObject(i2_1),
        lib.intervalFromIntervalObject(i2_2),
        lib.intervalFromIntervalObject(i2_3),
        lib.intervalFromIntervalObject(i2_4)
    )
    let joinedSchedule = lib.joinSchedules(schedule1, schedule2)
    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Join no schedules", (lib) => {
    let startDate = 0

    let joinedSchedule = lib.joinSchedules()
    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate))
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

each(implementation).test("Join schedules: Reach maximal number of recursions", (lib) => {
    let sd = 0
    let d = {seconds: 1}
    let p = {seconds: 2}
    let i = {start: -Infinity, end: Infinity}
    let startDate = 0

    let schedule1 = lib.RegularSchedule(lib.dateTimeFromDateOrNumber(sd), lib.durationFromDurationObject(d), lib.durationFromDurationObject(p))
    let schedule2 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i))
    let joinedSchedule = lib.joinSchedules(schedule1, schedule2)
    let generator = joinedSchedule(lib.dateTimeFromDateOrNumber(startDate))
    expect(() => generator.next()).toThrowError()
})
