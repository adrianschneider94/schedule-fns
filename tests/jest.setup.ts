import {DateTime, Duration, Interval, Settings} from "luxon"
import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {IntervalObject} from "schedule.js/functions/intervals"
import {DurationObject} from "schedule.js/functions/durations"
import {DateFnsImplementation} from "schedule.js/date-fns/implementation"
import {DateTimeImplementation, DTypes} from "schedule.js"
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
            toBeSameDateTimeAs: (expected: DateTime) => R
            toBeSameIntervalAs: (expected: Interval) => R
            toBeSameDurationAs: (expected: Duration) => R
        }
    }
}

expect.extend({
    toBeSameDateTimeAs: function toBeSameDateTimeAs(actual: DateTime, expected: DateTime): CustomMatcherResult {
        return {
            message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
            pass: actual.equals(expected)
        }
    },
    toBeSameIntervalAs: function (actual: Interval, expected: Interval): CustomMatcherResult {
        return {
            message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
            pass: LuxonImplementation.isEqual(actual.start, expected.start) && LuxonImplementation.isEqual(actual.end, expected.end)
        }
    },
    toBeSameDurationAs: (actual: Duration, expected: Duration) => {
        return {
            message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
            pass: actual.equals(expected)
        }
    }
})

type Implementation<T extends DTypes> = [
    DateTimeImplementation<T>,
    any,
    {
        createDateTime: (date: Date | number) => T['datetime'],
        createInterval: (interval: IntervalObject) => T['interval'],
        createDuration: (duration: DurationObject) => T['duration']
    }

]

export const implementation: Array<Implementation<any>> = [
    [
        LuxonImplementation,
        LuxonExports,
        {
            createDateTime: (date: Date | number) => DateTime.fromJSDate(new Date(date)),
            createInterval: (interval: IntervalObject) => Interval.fromDateTimes(new Date(interval.start), new Date(interval.end)),
            createDuration: (duration: DurationObject) => Duration.fromObject(duration)
        }
    ],
    [
        DateFnsImplementation,
        DateFnsExports,
        {
            createDateTime: (date: Date | number) => date,
            createInterval: (interval: IntervalObject) => interval,
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
    ]
]