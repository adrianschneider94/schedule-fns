import {DateTime as LuxonDateTime, Duration as LuxonDuration, Interval as LuxonInterval} from "luxon"

/**
 * A moment in time
 *
 * @category Definitions
 */
export type DateTime = LuxonDateTime
export const DateTime = LuxonDateTime


/**
 * A time interval
 *
 * @category Definitions
 */
export type Interval = LuxonInterval
export const Interval = LuxonInterval

/**
 * A duration.
 *
 * @category Definitions
 */
export type Duration = LuxonDuration
export const Duration = LuxonDuration

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
export const DateInfinity = 253402300799999
export const NegDateInfinity = -253402300799999

export const InfintyDateTime = LuxonDateTime.fromMillis(DateInfinity)
export const NegInfinityDateTime = LuxonDateTime.fromMillis(NegDateInfinity)

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
export type Schedule = (startDate: DateTime, direction?: direction) => IterableIterator<Interval>

export * from "./schedules"
export * from "./operations"
export * from "./functions"
