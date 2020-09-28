import {Duration, MAX_RECURSIONS, Schedule} from "../index"
import {differenceInMilliseconds, isWithinInterval} from "date-fns"

/**
 * Converts a duration into milliseconds.
 *
 * @param duration The duration to convert
 *
 * @internal
 */
export function durationToMilliseconds(duration: Duration): number {
    let values = [
        duration.years ? duration.years * 31556952000 : 0,
        duration.months ? duration.months * 2592000000 : 0,
        duration.weeks ? duration.weeks * 604800000 : 0,
        duration.days ? duration.days * 86400000 : 0,
        duration.hours ? duration.hours * 3600000 : 0,
        duration.minutes ? duration.minutes * 60000 : 0,
        duration.seconds ? duration.seconds * 1000 : 0
    ]
    return values.reduce((a, b) => a + b)
}

/**
 * Multiplies a duration with a factor.
 *
 * @param duration
 * @param factor
 *
 * @internal
 */
export function multiplyDuration(duration: Duration, factor: number): Duration {
    return {
        years: duration.years ? duration.years * factor : 0,
        months: duration.months ? duration.months * factor : 0,
        weeks: duration.weeks ? duration.weeks * factor : 0,
        days: duration.days ? duration.days * factor : 0,
        hours: duration.hours ? duration.hours * factor : 0,
        minutes: duration.minutes ? duration.minutes * factor : 0,
        seconds: duration.seconds ? duration.seconds * factor : 0,
    }
}

/**
 * Sums up durations.
 *
 * @param durations
 *
 * @internal
 */
export function addDurations(...durations: Array<Duration>) {
    return {
        years: durations.reduce((aggregate, duration) => aggregate + (duration.years || 0), 0),
        months: durations.reduce((aggregate, duration) => aggregate + (duration.months || 0), 0),
        weeks: durations.reduce((aggregate, duration) => aggregate + (duration.weeks || 0), 0),
        days: durations.reduce((aggregate, duration) => aggregate + (duration.days || 0), 0),
        hours: durations.reduce((aggregate, duration) => aggregate + (duration.hours || 0), 0),
        minutes: durations.reduce((aggregate, duration) => aggregate + (duration.minutes || 0), 0),
        seconds: durations.reduce((aggregate, duration) => aggregate + (duration.seconds || 0), 0),
    }
}

/**
 * Adds a duration to a given moment according to a schedule.
 *
 *
 * @param date The moment, the duration should be calculated from.
 * @param duration The duration that is added
 * @param schedule The schedule, that defines which time counts into the calculation.
 * @category Helper functions
 */
export function addDuration(date: Date | number, duration: Duration, schedule: Schedule) {
    let millisecondsLeft = durationToMilliseconds(duration)
    let generator = schedule(date)
    let i = 0
    while (i <= MAX_RECURSIONS) {
        i++
        let block = generator.next()
        if (block.value === undefined) {
            throw Error("Duration does not fit into the given schedule!")
        }
        if (isWithinInterval(block.value.start.valueOf() + millisecondsLeft, block.value)) {
            return new Date(block.value.start.valueOf() + millisecondsLeft)
        } else {
            millisecondsLeft -= differenceInMilliseconds(block.value.end, block.value.start)
        }
    }
    throw Error("Maximal number of recursions reached.")
}