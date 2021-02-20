import {DateTime, Duration, Interval} from "schedule.js"
import {Settings} from "luxon"
import {isEqual} from "schedule.js/functions/dateLibrary"
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
            pass: isEqual(actual.start, expected.start) && isEqual(actual.end, expected.end)
        }
    },
    toBeSameDurationAs: (actual: Duration, expected: Duration) => {
        return {
            message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
            pass: actual.equals(expected)
        }
    }
})