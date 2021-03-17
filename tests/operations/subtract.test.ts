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
        subtractSchedules
    } = x.fns as Exports<T>

    let {
        createDuration,
        createInterval,
        createDateTime
    } = x.creators as Creators<T>
    test("Subtract schedules", () => {
        let i1 = {start: 0, end: 10}
        let i2_1 = {start: 2, end: 3}
        let i2_2 = {start: 4, end: 5}
        let startDate = 0
        let e1 = {start: 0, end: 2}
        let e2 = {start: 3, end: 4}
        let e3 = {start: 5, end: 10}

        let schedule1 = ScheduleFromIntervals(createInterval(i1))
        let schedule2 = ScheduleFromIntervals(createInterval(i2_1), createInterval(i2_2))
        let subtractedSchedule = subtractSchedules(schedule1, schedule2)

        let generator = subtractedSchedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e3))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })
})