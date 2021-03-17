import {Interval} from "luxon"
import {DateTimeImplementation, Exports, Schedule} from "schedule.js"
import {Creators, implementation} from "../jest.setup"
import {OnSpecificWeekday} from "schedule.js/schedules/weekdays"

describe.each(implementation)('%#', <DT, I, D>(x: any) => {
    type T = {
        datetime: DT,
        interval: I,
        duration: D
    }
    let impl = x.impl as DateTimeImplementation<T>
    let implementationName = x.name

    let {
        Fridays,
        Mondays,
        Saturdays,
        Sundays,
        Thursdays,
        Tuesdays,
        Wednesdays,
        Weekends,
        WorkingDays
    } = x.fns as Exports<T>

    let {
        createDuration,
        createInterval,
        createDateTime
    } = x.creators as Creators<T>

    function intervalFromIsoStrings(interval: {start: string, end: string}): I {
        return createInterval({start: new Date(interval.start), end: new Date(interval.end)})
    }


    test("SpecificDay", () => {
        let schedule = OnSpecificWeekday(impl)(1)
        let generator = schedule(createDateTime(Date.parse("2020-09-23")))

        let e1 = {
            start: Date.parse("2020-09-27T22:00Z"),
            end: Date.parse("2020-09-28T22:00Z")
        }

        let e2 = {
            start: Date.parse("2020-10-04T22:00Z"),
            end: Date.parse("2020-10-05T22:00Z")
        }

        let value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

        value = generator.next()
        expect(value.done).toBe(false)
        expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))
    })
    
    if (implementationName !== "date-fns") {
        test("Specific Day in Tokyo", () => {
            let schedule = OnSpecificWeekday(impl)(1, {timeZone: "Asia/Tokyo"})

            let generator = schedule(createDateTime(Date.parse("2020-01-01T00:00+09:00")))

            let e1 = {
                start: Date.parse("2020-01-07T00:00+09:00"),
                end: Date.parse("2020-01-08T00:00+09:00")
            }

            let e2 = {
                start: Date.parse("2020-01-14T00:00+09:00"),
                end: Date.parse("2020-01-15T00:00+09:00")
            }

            let value = generator.next()
            expect(value.done).toBe(false)
            expect(value.value).toBeSameIntervalAs(impl, createInterval(e1))

            value = generator.next()
            expect(value.done).toBe(false)
            expect(value.value).toBeSameIntervalAs(impl, createInterval(e2))
        })
    }

    test("Weekdays", () => {
        let schedule: Schedule<T>
        let nextInterval: Interval
        let startDate = Date.parse("2020-09-28T00:00Z")

        schedule = Mondays()

        let e1 = {
            start: Date.parse("2020-09-28T00:00Z"),
            end: Date.parse("2020-09-28T22:00Z")
        }

        nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e1))

        schedule = Tuesdays()

        let e2 = {
            start: Date.parse("2020-09-28T22:00Z"),
            end: Date.parse("2020-09-29T22:00Z")
        }

        nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e2))

        schedule = Wednesdays()
        let e3 = {
            start: Date.parse("2020-09-29T22:00Z"),
            end: Date.parse("2020-09-30T22:00Z")
        }

        nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e3))

        schedule = Thursdays()

        let e4 = {
            start: Date.parse("2020-09-30T22:00Z"),
            end: Date.parse("2020-10-01T22:00Z")
        }

        nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e4))

        schedule = Fridays()

        let e5 = {
            start: Date.parse("2020-10-01T22:00Z"),
            end: Date.parse("2020-10-02T22:00Z")
        }

        nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e5))

        schedule = Saturdays()

        let e6 = {
            start: Date.parse("2020-10-02T22:00Z"),
            end: Date.parse("2020-10-03T22:00Z")
        }

        nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e6))


        schedule = Sundays()

        let e7 = {
            start: Date.parse("2020-10-03T22:00Z"),
            end: Date.parse("2020-10-04T22:00Z")
        }
        nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e7))

    })

    test("Weekends", () => {
        let schedule = Weekends()
        let startDate = Date.parse("2020-09-28T00:00Z")

        let e1 = {
            start: Date.parse("2020-10-02T22:00Z"),
            end: Date.parse("2020-10-04T22:00Z")
        }
        let nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e1))
    })

    test("WorkingDays", () => {
        let schedule = WorkingDays()
        let startDate = Date.parse("2020-09-28T00:00Z")

        let e1 = {
            start: Date.parse("2020-09-28T00:00Z"),
            end: Date.parse("2020-10-02T22:00Z")
        }

        let nextInterval = schedule(createDateTime(startDate)).next().value
        expect(nextInterval).toBeSameIntervalAs(impl, createInterval(e1))
    })

})