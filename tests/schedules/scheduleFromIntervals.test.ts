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
    } = x.fns as Exports<T>

    let {
        createInterval,
        createDateTime
    } = x.creators as Creators<T>
    test("Basic schedule from intervals", () => {
        let startDate = 0
        let intervals = [
            createInterval({start: 0, end: 10}),
            createInterval({start: 20, end: 30})
        ]

        let schedule = ScheduleFromIntervals(...intervals)
        let generator = schedule(createDateTime(startDate))

        let e1 = {start: 0, end: 10}
        let e2 = {start: 20, end: 30}

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Schedule from empty list of intervals", () => {
        let startDate = 0
        let schedule = ScheduleFromIntervals()
        let generator = schedule(createDateTime(startDate))
        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Schedule from intervals with startDate in interval", () => {
        let startDate = 25
        let intervals = [
            createInterval({start: 0, end: 10}),
            createInterval({start: 20, end: 30})
        ]

        let schedule = ScheduleFromIntervals(...intervals)
        let generator = schedule(createDateTime(startDate))

        let e1 = {start: 25, end: 30}

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Schedule from intervals with startDate after all intervals", () => {
        let startDate = 35
        let intervals = [
            createInterval({start: 0, end: 10}),
            createInterval({start: 20, end: 30})
        ]

        let schedule = ScheduleFromIntervals(...intervals)
        let generator = schedule(createDateTime(startDate))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Basic schedule from intervals, reverse direction", () => {
        let startDate = 50
        let intervals = [
            createInterval({start: 0, end: 10}),
            createInterval({start: 20, end: 30})
        ]

        let schedule = ScheduleFromIntervals(...intervals)
        let generator = schedule(createDateTime(startDate), "backward")

        let e1 = {start: 20, end: 30}
        let e2 = {start: 0, end: 10}

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

    test("Basic schedule from intervals, reverse direction, startDate in interval", () => {
        let startDate = 25
        let intervals = [
            createInterval({start: 0, end: 10}),
            createInterval({start: 20, end: 30})
        ]

        let schedule = ScheduleFromIntervals(...intervals)
        let generator = schedule(createDateTime(startDate), "backward")

        let e1 = {start: 20, end: 25}
        let e2 = {start: 0, end: 10}

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })
})