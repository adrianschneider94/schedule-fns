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
        Holidays
    } = x.fns as Exports<T>

    let {
        createInterval,
        createDateTime
    } = x.creators as Creators<T>


    function intervalFromIsoStrings(interval: {start: string, end: string}): I {
        return createInterval({start: new Date(interval.start), end: new Date(interval.end)})
    }


    test("Holidays in Bavaria", () => {
        let schedule = Holidays("DE", "BY", {types: ["public"]})

        let generator = schedule(createDateTime(Date.parse("2019-12-26T05:00:00.000+0100")))

        let e1 = {
            start: "2019-12-26T04:00:00.000Z",
            end: "2019-12-26T23:00:00.000Z"
        }
        let e2 = {
            start: "2019-12-31T23:00:00.000Z",
            end: "2020-01-01T23:00:00.000Z"
        }
        let e3 = {
            start: "2020-01-05T23:00:00.000Z",
            end: "2020-01-06T23:00:00.000Z"
        }

        let value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e1))

        value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e2))

        value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e3))
    })

    test("Holidays in Bavaria, backward", () => {
        let schedule = Holidays("DE", "BY", {types: ["public"]})

        let generator = schedule(createDateTime(Date.parse("2020-01-01T05:00:00.000+0100")), "backward")

        let e1 = {
            start: "2019-12-31T23:00:00.000Z",
            end: "2020-01-01T04:00:00.000Z"
        }

        let e2 = {
            start: "2019-12-24T23:00:00.000Z",
            end: "2019-12-26T23:00:00.000Z"
        }

        let value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e1))

        value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e2))
    })

})