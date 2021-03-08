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
        shiftSchedule
    } = x.fns as Exports<T>

    let {
        createDuration,
        createInterval,
        createDateTime
    } = x.creators as Creators<T>
    test("Shift schedule", () => {
        let i1 = {start: 0, end: 10000}
        let i2 = {start: 20000, end: 30000}
        let d = {seconds: 1}
        let startDate = 5000
        let e1 = {start: 5000, end: 11000}
        let e2 = {start: 21000, end: 31000}

        let schedule = ScheduleFromIntervals(createInterval(i1), createInterval(i2))
        let shifted = shiftSchedule(schedule, createDuration(d))

        let generator = shifted(createDateTime(startDate))
        let entry = generator.next()
        expect(entry.value).toBeSameIntervalAs(impl, createInterval(e1))

        entry = generator.next()
        expect(entry.value).toBeSameIntervalAs(impl, createInterval(e2))
    })

    test("Shift schedule backward", () => {
        let i1 = {start: 0, end: 10000}
        let i2 = {start: 20000, end: 30000}
        let d = {seconds: 1}
        let startDate = 5000
        let e1 = {start: 1000, end: 5000}

        let schedule = ScheduleFromIntervals(createInterval(i1), createInterval(i2))
        let shifted = shiftSchedule(schedule, createDuration(d))

        let generator = shifted(createDateTime(startDate), "backward")
        let entry = generator.next()
        expect(entry.value).toBeSameIntervalAs(impl, createInterval(e1))
    })

})