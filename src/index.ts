import {IntervalAsISOStrings} from "schedule.js/functions/intervals"
import {DurationObject} from "schedule.js/functions/durations"

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

export type DTypes = {
    datetime: unknown
    interval: unknown
    duration: unknown
}

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
export type Schedule<T extends DTypes> = (startDate: T['datetime'], direction?: direction) => IterableIterator<T['interval']>


export interface DateTimeImplementation<T extends DTypes> {
    InfinityDateTime: T['datetime']
    NegInfinityDateTime: T['datetime']

    roughDurationToMilliseconds(duration: T['duration']): number

    multiplyDuration(duration: T['duration'], factor: number): T['duration']

    durationSum(left: T['duration'], right: T['duration']): T['duration']

    isEqual(left: T['datetime'], right: T['datetime']): boolean

    compareAsc(left: T['datetime'], right: T['datetime']): number

    compareDesc(left: T['datetime'], right: T['datetime']): number

    intervalContains(interval: T['interval'], date: T['datetime']): boolean

    intervalToMilliseconds(interval: T['interval']): number

    intervalFromISOStrings(interval: IntervalAsISOStrings): T['interval']

    intersectTwoIntervals(left: T['interval'], right: T['interval']): T['interval']

    areTwoIntervalsEqual(left: T['interval'], right: T['interval']): boolean

    joinTwoIntervals(left: T['interval'], right: T['interval']): T['interval']

    createInterval(start: T['datetime'], end: T['datetime']): T['interval']

    addDuration(date: T['datetime'], duration: T['duration']): T['datetime']

    durationDifference(left: T['duration'], right: T['duration']): T['duration']

    startOfDay(date: T['datetime'], timeZone?: string): T['datetime']

    addDays(date: T['datetime'], amount: number): T['datetime']

    isBefore(left: T['datetime'], right: T['datetime']): boolean

    isEqualOrBefore(left: T['datetime'], right: T['datetime']): boolean

    isAfter(left: T['datetime'], right: T['datetime']): boolean

    isEqualOrAfter(left: T['datetime'], right: T['datetime']): boolean

    isIntervalEmpty(interval: T['interval']): boolean

    parseTimeAtGivenDay(timeString: string, day: T['datetime'], timeZone?: string): T['datetime']

    intervalToDuration(interval: T['interval']): T['duration']

    isWithinInterval(date: T['datetime'], interval: T['interval']): boolean

    parseJsDateTime(date: Date | number): T['datetime']

    getYear(date: T['datetime']): number

    differenceInMilliseconds(left: T['datetime'], right: T['datetime']): number

    setISODay(date: T['datetime'], day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): T['datetime']

    parseISO(date: string): T['datetime']

    getStart(interval: T['interval']): T['datetime']

    getEnd(interval: T['interval']): T['datetime']

    durationFromDurationObject(duration: DurationObject): T['duration']
}
