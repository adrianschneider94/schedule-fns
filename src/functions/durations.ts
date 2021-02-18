import {DateTime, Duration, Interval, MAX_RECURSIONS, Schedule} from "../index"
import {DurationOptions} from "luxon"


export type DurationObject = {
    years?: number,
    months?: number,
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
}

export function durationFromDurationObject(duration: DurationObject): Duration {
    return Duration.fromObject(duration)
}

/**
 * Converts a duration into milliseconds.
 *
 * @param duration The duration to convert
 *
 * @internal
 */
export function durationToMilliseconds(duration: Duration): number {
    return duration.toMillis()
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
    return Duration.fromObject({
        years: duration.years ? duration.years * factor : 0,
        quarters: duration.quarters ? duration.quarters * factor : 0,
        months: duration.months ? duration.months * factor : 0,
        weeks: duration.weeks ? duration.weeks * factor : 0,
        days: duration.days ? duration.days * factor : 0,
        hours: duration.hours ? duration.hours * factor : 0,
        minutes: duration.minutes ? duration.minutes * factor : 0,
        seconds: duration.seconds ? duration.seconds * factor : 0,
        milliseconds: duration.milliseconds ? duration.milliseconds * factor : 0,
        locale: duration.locale,
        numberingSystem: duration.numberingSystem as DurationOptions['numberingSystem']
    })
}

/**
 * Sums up durations.
 *
 * @param durations
 *
 * @internal
 */
export function addDurations(...durations: Array<Duration>) {
    return durations.reduce((aggregate, current) => aggregate.plus(current))
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
export function addDurationWithinSchedule(date: DateTime, duration: Duration, schedule: Schedule) {
    let millisecondsLeft = durationToMilliseconds(duration)
    let generator = schedule(date)
    let i = 0
    while (i <= MAX_RECURSIONS) {
        i++
        let block = generator.next() as IteratorYieldResult<Interval>
        if (block.value === undefined) {
            throw Error("Duration does not fit into the given schedule!")
        } else {
            let next = block.value.start.plus({milliseconds: millisecondsLeft})
            if (block.value.contains(next)) {
                return next
            } else {
                millisecondsLeft -= block.value.length('milliseconds')
            }
        }
    }
    throw Error("Maximal number of recursions reached.")
}