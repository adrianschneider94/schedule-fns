/**
 * The maximal number of recursions before an error is thrown.
 *
 * @internal
 */

export const MAX_RECURSIONS = 1000

/**
 * The direction in time. "forward" or 1 means into the future, "backward" or -1 into the past-
 *
 * @category Definitions
 */
export type direction = "forward" | "backward" | 1 | -1

/**
 * Definition of a schedule.
 *
 * A schedule is a generator, that returns one interval after another. The yielded intervals must all lay after the
 * startDate if going forward or before the startDate if going backward. The intervals must not overlap and must be
 * sorted.
 *
 * If the startDate is inside an interval, this interval must be shortened so that it begins with the startDate.
 *
 * @category Definitions
 */
export type Schedule<DateTime, Interval, Duration> = (startDate: DateTime, direction?: direction) => IterableIterator<Interval>


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

export type IntervalObject = {
    start: Date | number
    end: Date | number
}

export type IntervalAsISOStrings = {
    start: string
    end: string
}

export {take} from "./abstract/misc/misc"
export {LuxonScheduleFns} from "./luxon/implementation"