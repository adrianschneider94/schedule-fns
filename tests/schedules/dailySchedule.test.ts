import {Creators, implementation} from "../jest.setup"
import {Exports} from "schedule.js"


describe.each(implementation)('%#', <DT, I, D>(x: any) => {
    type T = {
        datetime: DT,
        interval: I,
        duration: D
    }
    let impl = x.impl
    let implementationName = x.name

    let {
        DailySchedule
    } = x.fns as Exports<T>

    let {
        createInterval,
        createDateTime
    } = x.creators as Creators<T>

    function intervalFromIsoStrings(interval: {start: string, end: string}): I {
        return createInterval({start: Date.parse(interval.start), end: Date.parse(interval.end)})
    }

    test("Daily schedule", () => {
        let startDate = "2020-01-01T20:00:00Z"

        let e1 = {
            start: "2020-01-02T08:00+0100",
            end: "2020-01-02T16:00+0100"
        }

        let e2 = {
            start: "2020-01-03T08:00+0100",
            end: "2020-01-03T16:00+0100"
        }

        let schedule = DailySchedule("08:00", "16:00")
        let generator = schedule(createDateTime(new Date(startDate)))

        let value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e1))

        value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e2))
    })

    if (implementationName !== "date-fns") {
        test("Daily schedule in Tokyo", () => {
            let startDate = "2020-01-01T20:00:00.000+09:00"

            let e1 = {
                start: "2020-01-02T08:00:00.000+09:00",
                end: "2020-01-02T16:00:00.000+09:00"
            }

            let e2 = {
                start: "2020-01-03T08:00:00.000+09:00",
                end: "2020-01-03T16:00:00.000+09:00"
            }

            let schedule = DailySchedule("08:00", "16:00", {timeZone: "Asia/Tokyo"})
            let generator = schedule(createDateTime(new Date(startDate)))

            let value = generator.next()
            expect(value.done).toBeFalsy()
            expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e1))

            value = generator.next()
            expect(value.done).toBeFalsy()
            expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e2))
        })
    }

    test("Daily schedule: DST switch", () => {
        let startDate = "2020-03-27T20:00"
        let schedule = DailySchedule("01:00", "05:00")
        let generator = schedule(createDateTime(new Date(startDate)))

        let e1 = {
            start: "2020-03-28T00:00Z",
            end: "2020-03-28T04:00Z"
        }

        let e2 = {
            start: "2020-03-29T00:00Z",
            end: "2020-03-29T03:00Z"
        }

        let e3 = {
            start: "2020-03-29T23:00Z",
            end: "2020-03-30T03:00Z"
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

    test("Daily schedule: Start in first interval", () => {
        let startDate = "2020-01-01T10:00Z"
        let schedule = DailySchedule("08:00", "16:00")
        let generator = schedule(createDateTime(new Date(startDate)))

        let e1 = {
            start: "2020-01-01T10:00Z",
            end: "2020-01-01T15:00Z"
        }

        let e2 = {
            start: "2020-01-02T07:00Z",
            end: "2020-01-02T15:00Z"
        }

        let value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e1))

        value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e2))

    })

    test("Daily schedule: Start before first interval", () => {
        let startDate = "2020-01-01T01:00Z"
        let schedule = DailySchedule("08:00", "16:00")
        let generator = schedule(createDateTime(new Date(startDate)))

        let e1 = {
            start: "2020-01-01T07:00Z",
            end: "2020-01-01T15:00Z"
        }

        let e2 = {
            start: "2020-01-02T07:00Z",
            end: "2020-01-02T15:00Z"
        }

        let value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e1))

        value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e2))
    })


    test("Daily schedule: Backward", () => {
        let startDate = "2020-01-01T10:00Z"
        let schedule = DailySchedule("08:00", "16:00")
        let generator = schedule(createDateTime(new Date(startDate)), "backward")

        let e1 = {
            start: "2020-01-01T07:00Z",
            end: "2020-01-01T10:00Z"
        }
        let e2 = {
            start: "2019-12-31T07:00Z",
            end: "2019-12-31T15:00Z"
        }

        let e3 = {
            start: "2019-12-30T07:00Z",
            end: "2019-12-30T15:00Z"
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

    test("Daily schedule: Backward, first interval before startDate", () => {
        let startDate = Date.parse("2020-01-01T17:00Z")
        let schedule = DailySchedule("08:00", "16:00")
        let generator = schedule(createDateTime(startDate), "backward")

        let e1 = {
            start: "2020-01-01T07:00Z",
            end: "2020-01-01T15:00Z"
        }
        let e2 = {
            start: "2019-12-31T07:00Z",
            end: "2019-12-31T15:00Z"
        }
        let e3 = {
            start: "2019-12-30T07:00Z",
            end: "2019-12-30T15:00Z"
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

    test("Daily schedule over midnight", () => {
        let startDate = "2020-01-01T00:00Z"
        let schedule = DailySchedule("08:00", "02:00")
        let generator = schedule(createDateTime(new Date(startDate)))

        let e1 = {
            start: "2020-01-01T00:00Z",
            end: "2020-01-01T01:00Z"
        }
        let e2 = {
            start: "2020-01-01T07:00Z",
            end: "2020-01-02T01:00Z"
        }

        let value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e1))

        value = generator.next()
        expect(value.done).toBeFalsy()
        expect(value.value).toBeSameIntervalAs(impl, intervalFromIsoStrings(e2))
    })

})