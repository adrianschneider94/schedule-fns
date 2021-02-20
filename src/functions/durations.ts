import {DateTime, Duration, durationFromDurationObject, Interval, MAX_RECURSIONS, Schedule} from "../index"
import {
    addDuration,
    durationSum,
    durationToMilliseconds,
    intervalContains,
    intervalToMilliseconds,
    isEqual
} from "./dateLibrary"


export type DurationObject = {
    years?: number,
    quarters?: number,
    months?: number,
    weeks?: number,
    days?: number,
    hours?: number,
    minutes?: number,
    seconds?: number
    milliseconds?: number
}

/**
 * Sums up durations.
 *
 * @param durations
 *
 * @internal
 */
export function addDurations(...durations: Array<Duration>) {
    return durations.reduce((aggregate, current) => durationSum(aggregate, current))
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
            let next = addDuration(block.value.start, durationFromDurationObject({milliseconds: millisecondsLeft}))
            if (intervalContains(block.value, next) || isEqual(block.value.end, next)) {
                return next
            } else {
                millisecondsLeft -= intervalToMilliseconds(block.value)
            }
        }
    }
    throw Error("Maximal number of recursions reached.")
}