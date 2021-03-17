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
        intersectSchedules
    } = x.fns as Exports<T>

    let {
        createDuration,
        createInterval,
        createDateTime
    } = x.creators as Creators<T>

    test("Intersect no schedules", () => {
        let startDate = 0
        let intersectedSchedule = intersectSchedules()
        let generator = intersectedSchedule(createDateTime(startDate))
        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Intersect single schedule", () => {
        let i1 = {start: 0, end: 1}
        let i2 = {start: 2, end: 3}

        let startDate = 0

        let e1 = {start: 0, end: 1}
        let e2 = {start: 2, end: 3}

        let schedule = ScheduleFromIntervals(createInterval(i1), createInterval(i2))
        let intersectedSchedule = intersectSchedules(schedule)
        let generator = intersectedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Intersect two simple schedules", () => {
        let i1 = {start: 0, end: 2}
        let i2 = {start: 1, end: 3}

        let startDate = 0
        let e1 = {start: 1, end: 2}

        let schedule1 = ScheduleFromIntervals(createInterval(i1))
        let schedule2 = ScheduleFromIntervals(createInterval(i2))
        let intersectedSchedule = intersectSchedules(schedule1, schedule2)

        let generator = intersectedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Intersect two simple schedules, reverse direction", () => {
        let i1 = {start: 0, end: 2}
        let i2 = {start: 1, end: 3}

        let startDate = 4

        let e1 = {start: 1, end: 2}

        let schedule1 = ScheduleFromIntervals(createInterval(i1))
        let schedule2 = ScheduleFromIntervals(createInterval(i2))
        let intersectedSchedule = intersectSchedules(schedule1, schedule2)

        let generator = intersectedSchedule(createDateTime(startDate), "backward")

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Intersect two schedules", () => {
        let i1 = {start: 0, end: 10}
        let i2_1 = {start: 1, end: 2}
        let i2_2 = {start: 3, end: 4}
        let startDate = 0
        let e1 = {start: 1, end: 2}
        let e2 = {start: 3, end: 4}

        let schedule1 = ScheduleFromIntervals(createInterval(i1))
        let schedule2 = ScheduleFromIntervals(createInterval(i2_1), createInterval(i2_2))
        let intersectedSchedule = intersectSchedules(schedule1, schedule2)

        let generator = intersectedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

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

        let schedule1 = ScheduleFromIntervals(createInterval(i1_1), createInterval(i1_2))
        let schedule2 = ScheduleFromIntervals(createInterval(i2_1), createInterval(i2_2), createInterval(i2_3))
        let intersectedSchedule = intersectSchedules(schedule1, schedule2)

        let generator = intersectedSchedule(createDateTime(startDate), "backward")

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Intersect two disjoint schedules", () => {
        let i1_1 = {start: 0, end: 1}
        let i2_1 = {start: 2, end: 3}
        let i2_2 = {start: 4, end: 5}
        let startDate = 0

        let schedule1 = ScheduleFromIntervals(createInterval(i1_1))
        let schedule2 = ScheduleFromIntervals(createInterval(i2_1), createInterval(i2_2))
        let intersectedSchedule = intersectSchedules(schedule1, schedule2)

        let generator = intersectedSchedule(createDateTime(startDate))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Intersect schedules: Reach maximal number of recursions", () => {
        let startMoment1 = 0
        let startMoment2 = 1000
        let duration = {seconds: 0.5}
        let period = {seconds: 2}
        let startDate = 0

        let schedule1 = RegularSchedule(createDateTime(startMoment1), createDuration(duration), createDuration(period))
        let schedule2 = RegularSchedule(createDateTime(startMoment2), createDuration(duration), createDuration(period))
        let intersectedSchedule = intersectSchedules(schedule1, schedule2)
        let generator = intersectedSchedule(createDateTime(startDate))

        expect(() => generator.next()).toThrowError()
    })

})