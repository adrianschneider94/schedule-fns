import {DurationObject} from "schedule.js/functions/durations"
import {IntervalAsISOStrings, IntervalObject} from "schedule.js/functions/intervals"

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

export interface DateTimeImplementation<DateTime, Interval, Duration> {
    InfinityDateTime: DateTime
    NegInfinityDateTime: DateTime

    durationFromDurationObject(duration: DurationObject): Duration

    roughDurationToMilliseconds(duration: Duration): number

    multiplyDuration(duration: Duration, factor: number): Duration

    durationSum(left: Duration, right: Duration): Duration

    isEqual(left: DateTime, right: DateTime): boolean

    compareAsc(left: DateTime, right: DateTime): number

    compareDesc(left: DateTime, right: DateTime): number

    intervalContains(interval: Interval, date: DateTime): boolean

    intervalToMilliseconds(interval: Interval): number

    dateTimeFromDateOrNumber(date: Date | number): DateTime

    intervalFromIntervalObject(intervalObject: IntervalObject): Interval

    intervalFromISOStrings(interval: IntervalAsISOStrings): Interval

    intersectTwoIntervals(left: Interval, right: Interval): Interval

    areTwoIntervalsEqual(left: Interval, right: Interval): boolean

    joinTwoIntervals(left: Interval, right: Interval): Interval

    createInterval(start: DateTime, end: DateTime): Interval

    addDuration(date: DateTime, duration: Duration): DateTime

    durationDifference(left: Duration, right: Duration): Duration

    startOfDay(date: DateTime, timeZone?: string): DateTime

    addDays(date: DateTime, amount: number): DateTime

    isBefore(left: DateTime, right: DateTime): boolean

    isEqualOrBefore(left: DateTime, right: DateTime): boolean

    isAfter(left: DateTime, right: DateTime): boolean

    isEqualOrAfter(left: DateTime, right: DateTime): boolean

    isIntervalEmpty(interval: Interval): boolean

    parseTimeAtGivenDay(timeString: string, day: DateTime, timeZone?: string): DateTime

    intervalToDuration(interval: Interval): Duration

    isWithinInterval(date: DateTime, interval: Interval): boolean

    parseJsDateTime(date: Date | number): DateTime

    getYear(date: DateTime): number

    differenceInMilliseconds(left: DateTime, right: DateTime): number

    setISODay(date: DateTime, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): DateTime

    parseISO(date: string): DateTime

    getStart(interval: Interval): DateTime

    getEnd(interval: Interval): DateTime
}