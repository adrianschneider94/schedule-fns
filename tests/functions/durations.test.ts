import {Creators, implementation} from "../jest.setup"
import {DateTimeImplementation, Exports} from "schedule.js"

describe.each(implementation)('%#', <DT, I, D>(x: any) => {
    type T = {
        datetime: DT,
        interval: I,
        duration: D
    }
    let impl = x.impl

    let {
        roughDurationToMilliseconds,
        multiplyDuration,
        durationSum
    } = x.impl as DateTimeImplementation<T>

    let {
        addDurationWithinSchedule,
        ScheduleFromIntervals,
        RegularSchedule
    } = x.fns as Exports<T>

    let {
        createDuration,
        createInterval,
        createDateTime
    } = x.creators as Creators<T>


    test("durationToMilliseconds: 5 hours, 6 minutes, 7 seconds", () => {
        type D = T['duration']
        let input = {
            hours: 5,
            minutes: 6,
            seconds: 7
        }
        expect(roughDurationToMilliseconds(createDuration(input))).toStrictEqual(18367000)
    })


    test("multiplyDuration", () => {
        let input = {
            years: 1,
            months: 2,
            weeks: 3,
            days: 4,
            hours: 5,
            minutes: 6,
            seconds: 7
        }
        let factor = 2
        let expected = {
            years: 2,
            months: 4,
            weeks: 6,
            days: 8,
            hours: 10,
            minutes: 12,
            seconds: 14
        }
        expect(multiplyDuration(createDuration(input), factor)).toBeSameDurationAs(impl, createDuration(expected))
    })

    test("addDurations", () => {
        let duration1 = {years: 1, months: 2, weeks: 3, days: 4, hours: 5, minutes: 6, seconds: 7}
        let duration2 = {years: 8, months: 7, weeks: 6, days: 5, hours: 4, minutes: 3, seconds: 2}
        let expected = {years: 9, months: 9, weeks: 9, days: 9, hours: 9, minutes: 9, seconds: 9}
        expect(durationSum(createDuration(duration1), createDuration(duration2))).toBeSameDurationAs(impl, createDuration(expected))
    })

    test("addDuration 1", () => {
        let interval1 = {start: 0, end: 10*1000}
        let interval2 = {start: 20*1000, end: 30*1000}
        let schedule = ScheduleFromIntervals(createInterval(interval1), createInterval(interval2))
        let startDate = 0
        let duration = {seconds: 15}
        let expected = 25*1000

        let result = addDurationWithinSchedule(createDateTime(startDate), createDuration(duration), schedule)
        expect(result).toBeSameDateTimeAs(impl, createDateTime(expected))
    })

    test("addDuration 2", () => {
        let interval1 = {start: 5*1000, end: 10*1000}
        let interval2 = {start: 20*1000, end: 30*1000}
        let schedule = ScheduleFromIntervals(createInterval(interval1), createInterval(interval2))
        let startDate = 0
        let duration = {seconds: 15}
        let expected = 30*1000

        let result = addDurationWithinSchedule(createDateTime(startDate), createDuration(duration), schedule)
        expect(result).toBeSameDateTimeAs(impl, createDateTime(expected))
    })

    test("addDuration 3", () => {
        let interval1 = {start: 5*1000, end: 10*1000}
        let interval2 = {start: 20*1000, end: 30*1000}
        let schedule = ScheduleFromIntervals(createInterval(interval1), createInterval(interval2))
        let startDate = 0
        let duration = {seconds: 30}

        expect(() => addDurationWithinSchedule(createDateTime(startDate), createDuration(duration), schedule)).toThrowError()
    })

    test("addDuration 4", () => {
        let startDate = new Date()
        let duration_ = {seconds: 1}
        let period = {seconds: 2}
        let duration = {years: 1}

        let schedule = RegularSchedule(createDateTime(startDate), createDuration(duration_), createDuration(period))
        expect(() => addDurationWithinSchedule(createDateTime(startDate), createDuration(duration), schedule)).toThrowError()
    })
})
