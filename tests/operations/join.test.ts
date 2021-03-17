import {Creators, implementation} from "../jest.setup"
import {Exports} from "schedule.js"

describe.each(implementation)('%#', <DT, I, D>(x: any) => {
    type T = {
        datetime: DT,
        interval: I,
        duration: D
    }
    let impl = x.impl

    let {
        ScheduleFromIntervals,
        RegularSchedule,
        joinSchedules
    } = x.fns as Exports<T>

    let {
        createDuration,
        createInterval,
        createDateTime
    } = x.creators as Creators<T>
    test("Join single schedule", () => {
        let i1 = {start: 0, end: 1}
        let i2 = {start: 2, end: 3}
        let startDate = 0

        let e1 = {start: 0, end: 1}
        let e2 = {start: 2, end: 3}

        let schedule = ScheduleFromIntervals(createInterval(i1), createInterval(i2))
        let joinedSchedule = joinSchedules(schedule)
        let generator = joinedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Join two simple schedules", () => {
        let i1_1 = {start: 0, end: 10}
        let i1_2 = {start: 19, end: 30}
        let i2 = {start: 9, end: 20}
        let startDate = 0

        let e1 = {start: 0, end: 30}

        let schedule1 = ScheduleFromIntervals(createInterval(i1_1), createInterval(i1_2))
        let schedule2 = ScheduleFromIntervals(createInterval(i2))
        let joinedSchedule = joinSchedules(schedule1, schedule2)

        let generator = joinedSchedule(createDateTime(startDate))
        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))
        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Join three simple schedules", () => {
        let i1_1 = {start: 0, end: 1}
        let i1_2 = {start: 3, end: 4}
        let i2_1 = {start: 1, end: 2}
        let i2_2 = {start: 5, end: 6}
        let i3_1 = {start: 2, end: 3}
        let i3_2 = {start: 6, end: 7}
        let startDate = -10
        let e1 = {start: 0, end: 4}
        let e2 = {start: 5, end: 7}

        let schedule1 = ScheduleFromIntervals(createInterval(i1_1), createInterval(i1_2))
        let schedule2 = ScheduleFromIntervals(createInterval(i2_1), createInterval(i2_2))
        let schedule3 = ScheduleFromIntervals(createInterval(i3_1), createInterval(i3_2))
        let joinedSchedule = joinSchedules(schedule1, schedule2, schedule3)
        let generator = joinedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Join three simple schedules, reverse order", () => {
        let i1_1 = {start: 0, end: 1}
        let i1_2 = {start: 3, end: 4}

        let i2_1 = {start: 1, end: 2}
        let i2_2 = {start: 5, end: 6}

        let i3_1 = {start: 2, end: 3}
        let i3_2 = {start: 6, end: 7}

        let startDate = 6.5

        let e1 = {start: 5, end: 6.5}
        let e2 = {start: 0, end: 4}

        let schedule1 = ScheduleFromIntervals(createInterval(i1_1), createInterval(i1_2))
        let schedule2 = ScheduleFromIntervals(createInterval(i2_1), createInterval(i2_2))
        let schedule3 = ScheduleFromIntervals(createInterval(i3_1), createInterval(i3_2))
        let joinedSchedule = joinSchedules(schedule1, schedule2, schedule3)
        let generator = joinedSchedule(createDateTime(startDate), "backward")

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Join two schedules (with infinity)", () => {
        let i1 = {start: 0, end: Infinity}
        let i2 = {start: 1, end: 2}
        let startDate = -10
        let e1 = {start: 0, end: Infinity}

        let schedule1 = ScheduleFromIntervals(createInterval(i1))
        let schedule2 = ScheduleFromIntervals(createInterval(i2))
        let joinedSchedule = joinSchedules(schedule1, schedule2)
        let generator = joinedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Join two schedules (one long-running)", () => {
        let i1 = {start: 0, end: 1000}
        let i2_1 = {start: 1, end: 2}
        let i2_2 = {start: 3, end: 4}
        let i2_3 = {start: 5, end: 6}
        let i2_4 = {start: 7, end: 8}
        let startDate = -10
        let e1 = {start: 0, end: 1000}

        let schedule1 = ScheduleFromIntervals(createInterval(i1))
        let schedule2 = ScheduleFromIntervals(
            createInterval(i2_1),
            createInterval(i2_2),
            createInterval(i2_3),
            createInterval(i2_4)
        )
        let joinedSchedule = joinSchedules(schedule1, schedule2)
        let generator = joinedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Join no schedules", () => {
        let startDate = 0

        let joinedSchedule = joinSchedules()
        let generator = joinedSchedule(createDateTime(startDate))
        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Join schedules: Reach maximal number of recursions", () => {
        let sd = 0
        let d = {seconds: 1}
        let p = {seconds: 2}
        let i = {start: -Infinity, end: Infinity}
        let startDate = 0

        let schedule1 = RegularSchedule(createDateTime(sd), createDuration(d), createDuration(p))
        let schedule2 = ScheduleFromIntervals(createInterval(i))
        let joinedSchedule = joinSchedules(schedule1, schedule2)
        let generator = joinedSchedule(createDateTime(startDate))
        expect(() => generator.next()).toThrowError()
    })

})