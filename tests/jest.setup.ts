import {DateTime, Duration, Interval, Settings} from "luxon"
import {LuxonImplementation, LuxonTypes} from "schedule.js/luxon/implementation"
import {IntervalObject} from "schedule.js/functions/intervals"
import {DurationObject} from "schedule.js/functions/durations"
import {DateFnsImplementation, DateFnsTypes} from "schedule.js/date-fns/implementation"
import {DateTimeImplementation, DTypes, Exports} from "schedule.js"
import * as LuxonExports from "schedule.js/luxon"
import * as DateFnsExports from "schedule.js/date-fns"
import CustomMatcherResult = jest.CustomMatcherResult

Settings.defaultZoneName = "Europe/Berlin"

function orZero(value?: number): number {
    return value !== undefined ? value : 0
}

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSameDateTimeAs: (impl: DateTimeImplementation<any>, expected: any) => R
            toBeSameIntervalAs: (impl: DateTimeImplementation<any>, expected: any) => R
            toBeSameDurationAs: (impl: DateTimeImplementation<any>, expected: any) => R
        }
    }
}

expect.extend({
    toBeSameDateTimeAs: function toBeSameDateTimeAs(actual: any, impl: DateTimeImplementation<any>, expected: any): CustomMatcherResult {
        return {
            message: () => `Should be equal. Actual: ${impl.toISO(actual)}, expected: ${impl.toISO(expected)}`,
            pass: impl.isEqual(actual, expected)
        }
    },
    toBeSameIntervalAs: function (actual: any, impl: DateTimeImplementation<any>, expected: any): CustomMatcherResult {
        return {
            message: () => `Should be equal. Actual: ${impl.intervalToIso(actual)}, expected: ${impl.intervalToIso(expected)}`,
            pass: impl.areTwoIntervalsEqual(actual, expected)
        }
    },
    toBeSameDurationAs: (actual: any, impl: DateTimeImplementation<any>, expected: any) => {
        return {
            message: () => `Should be equal. Actual: ${impl.durationToIso(actual)}, expected: ${impl.durationToIso(expected)}`,
            pass: impl.areDurationsEqual(actual, expected)
        }
    }
})

export type Creators<T extends DTypes> = {
    createDateTime: (date: Date | number) => T['datetime'],
    createInterval: (interval: IntervalObject) => T['interval'],
    createDuration: (duration: DurationObject) => T['duration'],
}

export type Implementation<T extends DTypes, I extends DateTimeImplementation<T> = DateTimeImplementation<T>> = {
    name: "luxon" | "date-fns"
    impl: I,
    fns: Exports<T>,
    creators: Creators<T>
}

export type Implementations = [
    Implementation<LuxonTypes>,
    Implementation<DateFnsTypes>
]

function createLuxonDateTime(date: Date | number) {
    if (date.valueOf() >= 253402300799999) {
        return LuxonImplementation.InfinityDateTime
    } else if (date.valueOf() <= -253402300799999) {
        return LuxonImplementation.NegInfinityDateTime
    } else {
        return DateTime.fromJSDate(new Date(date))
    }
}

function createDateFnsDateTime(date: Date | number) {
    if (date.valueOf() >= 8640000000000000) {
        return 8640000000000000
    } else if (date.valueOf() <= -8640000000000000) {
        return -8640000000000000
    } else {
        return new Date(date)
    }
}


export const implementation: Implementations = [
    {
        name: "luxon",
        impl: LuxonImplementation,
        fns: LuxonExports,
        creators: {
            createDateTime: createLuxonDateTime,
            createInterval: (interval: IntervalObject) => Interval.fromDateTimes(createLuxonDateTime(interval.start), createLuxonDateTime(interval.end)),
            createDuration: (duration: DurationObject) => Duration.fromObject(duration)
        }
    },
    {
        name: "date-fns",
        impl: DateFnsImplementation,
        fns: DateFnsExports,
        creators: {
            createDateTime: createDateFnsDateTime,
            createInterval: (interval: IntervalObject) => {
                return {
                    start: createDateFnsDateTime(interval.start),
                    end: createDateFnsDateTime(interval.end)
                }
            },
            createDuration: (duration) => ({
                years: orZero(duration?.years),
                months: orZero(duration?.months) + orZero(duration.quarters) * 3,
                weeks: orZero(duration?.weeks),
                days: orZero(duration?.days),
                hours: orZero(duration?.hours),
                minutes: orZero(duration?.minutes),
                seconds: orZero(duration?.seconds) + orZero(duration.milliseconds) / 1000
            })
        }
    }
]
