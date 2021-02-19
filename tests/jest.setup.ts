import {DateTime, Duration, Interval} from "schedule-fns"
import CustomMatcherResult = jest.CustomMatcherResult
import {Settings} from 'luxon'

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
            message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}` ,
            pass: actual.equals(expected)
        }
    },
    toBeSameIntervalAs: function (actual: Interval, expected: Interval): CustomMatcherResult {
        return {
            message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
            pass: actual.equals(expected)
        }
    },
    toBeSameDurationAs: (actual: Duration, expected: Duration) => {
        return {
            message: () => `Should be equal. Actual: ${actual.toISO()}, expected: ${expected.toISO()}`,
            pass: actual.equals(expected)
        }
    }
})