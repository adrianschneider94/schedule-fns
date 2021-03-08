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
        From,
        Until
    } = x.fns as Exports<T>

    let {
        createInterval,
        createDateTime
    } = x.creators as Creators<T>

    test("From", () => {
        let startDate = Date.parse("2020-09-01T13:00Z")
        let schedule = From(createDateTime(startDate))

        let start = Date.parse("2020-09-01T14:00Z")
        let e1 = {start, end: Infinity}
        let e2 = {start: startDate, end: start}

        let generator = schedule(createDateTime(start))
        expect(generator.next().value).toBeSameIntervalAs(impl, createInterval(e1))

        generator = schedule(createDateTime(start), "backward")
        expect(generator.next().value).toBeSameIntervalAs(impl, createInterval(e2))
    })

    test("Until", () => {
        let endDate = Date.parse("2020-09-01T14:00Z")
        let schedule = Until(createDateTime(endDate))

        let start = Date.parse("2020-09-01T13:00Z")
        let e1 = {start: start, end: endDate}
        let e2 = {start: -Infinity, end: start}

        let generator = schedule(createDateTime(start))
        expect(generator.next().value).toBeSameIntervalAs(impl, createInterval(e1))

        generator = schedule(createDateTime(start), "backward")
        expect(generator.next().value).toBeSameIntervalAs(impl, createInterval(e2))
    })
})