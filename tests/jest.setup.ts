import {DateTime as LuxonDateTime, Duration as LuxonDuration, Interval as LuxonInterval, Settings} from "luxon"
import {DateFnsScheduleFns as dateFns, LuxonScheduleFns as luxon} from "schedule.js"
import {Duration as DateFnsDuration, formatISO, formatISODuration, Interval as DateFnsInterval} from "date-fns"
import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {DateFnsImplementation} from "schedule.js/date-fns/implementation"
import CustomMatcherResult = jest.CustomMatcherResult

Settings.defaultZoneName = "Europe/Berlin"
export const implementation: [LuxonImplementation, DateFnsImplementation] = [luxon, dateFns]

type ScheduleFnsDateTime = Date | number

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeSameDateTimeAs: (expected: LuxonDateTime | ScheduleFnsDateTime) => R
            toBeSameIntervalAs: (expected: LuxonInterval | DateFnsInterval) => R
            toBeSameDurationAs: (expected: LuxonDuration | DateFnsDuration) => R
        }
    }
}

expect.extend({
    toBeSameDateTimeAs: function toBeSameDateTimeAs(actual: LuxonDateTime | ScheduleFnsDateTime, expected: LuxonDateTime | ScheduleFnsDateTime): CustomMatcherResult {
        if (actual instanceof LuxonDateTime && expected instanceof LuxonDateTime) {
            return {
                message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
                pass: actual.equals(expected)
            }
        } else if (!(actual instanceof LuxonDateTime || expected instanceof LuxonDateTime)) {
            return {
                message: () => `Should be equal. Actual: ${formatISO(actual)}, expected: ${formatISO(expected)}`,
                pass: actual.valueOf() === expected.valueOf()
            }
        } else {
            return {
                message: () => `Non matching date-time types`,
                pass: false
            }
        }
    },
    toBeSameIntervalAs: function (actual: LuxonInterval | DateFnsInterval, expected: LuxonInterval | DateFnsInterval): CustomMatcherResult {
        if (actual instanceof LuxonInterval && expected instanceof LuxonInterval) {
            return {
                message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
                pass: luxon.areIntervalsEqual(actual, expected)
            }
        } else if (!(actual instanceof LuxonInterval || expected instanceof LuxonInterval)) {
            return {
                message: () => `Should be equal. Actual: ${dateFns.intervalToIso(actual)}, expected: ${dateFns.intervalToIso(expected)}`,
                pass: dateFns.areTwoIntervalsEqual(actual, expected)
            }
        } else {
            return {
                message: () => `Non matching Interval types`,
                pass: false
            }
        }

    },
    toBeSameDurationAs: (actual: LuxonDuration | DateFnsDuration, expected: LuxonDuration | DateFnsDuration) => {
        if (actual instanceof LuxonDuration && expected instanceof LuxonDuration) {
            return {
                message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
                pass: actual.equals(expected)
            }
        } else {
            return {
                message: () => `Should be equal. Actual: ${formatISODuration(actual)}, expected: ${formatISODuration(expected)}`,
                pass: dateFns.areDurationsEqual(actual, expected)
            }
        }
    }
})