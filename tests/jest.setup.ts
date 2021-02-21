import {DateTime, Duration, Interval, Settings} from "luxon"
import {LuxonImplementation} from "schedule.js/luxon/implementation"
import CustomMatcherResult = jest.CustomMatcherResult

Settings.defaultZoneName = "Europe/Berlin"

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