let intl: typeof globalThis.Intl
if (!global.Intl) {
    intl = require('intl')
    require('intl/locale-data/jsonp/en.js')
    global.Intl = intl
} {
    intl = global.Intl
}
export const Intl = intl

/**
 * A time interval
 *
 * @category Definitions
 */
export type Interval = {
    start: Date | number
    end: Date | number
}

/**
 * A duration.
 *
 * @category Definitions
 */
export type Duration = {
    years?: number
    months?: number
    weeks?: number
    days?: number
    hours?: number
    minutes?: number
    seconds?: number
}

/**
 * The maximal number of recursions before an error is thrown.
 *
 * @internal
 */
export const MAX_RECURSIONS = 1000

/**
 * Describes the maximal date in javascript.
 *
 * @internal
 */
export const DateInfinity = 8640000000000000

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
export type Schedule = (startDate: Date | number, direction?: direction) => IterableIterator<Interval>

export * from "./schedules"
export * from "./operations"
export * from "./functions"
