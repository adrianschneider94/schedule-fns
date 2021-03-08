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
        symmetricDifferenceOfSchedules
    } = x.fns as Exports<T>

    let {
        createInterval,
        createDateTime
    } = x.creators as Creators<T>

    test("Symmetric difference of schedules", () => {
        let i1 = {start: 0, end: 2}
        let i2 = {start: 1, end: 3}
        let startDate = 0
        let e1 = {start: 0, end: 1}
        let e2 = {start: 2, end: 3}

        let schedule1 = ScheduleFromIntervals(createInterval(i1))
        let schedule2 = ScheduleFromIntervals(createInterval(i2))
        let schedule = symmetricDifferenceOfSchedules(schedule1, schedule2)

        let generator = schedule(createDateTime(startDate))

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))

        expect(generator.next()).toStrictEqual({value: undefined, done: true})
    })

})