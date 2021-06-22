import {DurationObject, IntervalAsISOStrings, IntervalObject} from "schedule.js"
import {addDurations} from "./durations"
import {
    areIntervalsConnected,
    areIntervalsEqual,
    areIntervalsIntersecting,
    intersectIntervals,
    joinIntervals,
    mergeIntervals
} from "./intervals"

export abstract class DateTimeLibrary<DateTime, Interval, Duration> {
    public abstract durationFromDurationObject(duration: DurationObject): Duration

    public abstract durationToMilliseconds(duration: Duration): number

    public abstract multiplyDuration(duration: Duration, factor: number): Duration

    public abstract durationSum(left: Duration, right: Duration): Duration

    public abstract isEqual(left: DateTime, right: DateTime): boolean

    public abstract compareAsc(left: DateTime, right: DateTime): number

    public abstract compareDesc(left: DateTime, right: DateTime): number

    public abstract intervalContains(interval: Interval, date: DateTime): boolean

    public abstract intervalToMilliseconds(interval: Interval): number

    public abstract dateTimeFromDateOrNumber(date: Date | number): DateTime

    public abstract intervalFromIntervalObject(intervalObject: IntervalObject): Interval

    public abstract intervalFromISOStrings(interval: IntervalAsISOStrings): Interval

    public abstract intersectTwoIntervals(left: Interval, right: Interval): Interval

    public abstract areTwoIntervalsEqual(left: Interval, right: Interval): boolean

    public abstract joinTwoIntervals(left: Interval, right: Interval): Interval

    public abstract createInterval(start: DateTime, end: DateTime): Interval

    public abstract addDuration(date: DateTime, duration: Duration): DateTime

    public abstract startOfDay(date: DateTime, timeZone?: string): DateTime

    public abstract addDays(date: DateTime, amount: number): DateTime

    public abstract isBefore(left: DateTime, right: DateTime): boolean

    public abstract isEqualOrBefore(left: DateTime, right: DateTime): boolean

    public abstract isAfter(left: DateTime, right: DateTime): boolean

    public abstract isEqualOrAfter(left: DateTime, right: DateTime): boolean

    public abstract isIntervalEmpty(interval: Interval): boolean

    public abstract parseTimeAtGivenDay(timeString: string, day: DateTime, timeZone?: string): DateTime

    public abstract getIntervalStart(interval: Interval): DateTime

    public abstract getIntervalEnd(interval: Interval): DateTime

    public abstract getYear(date: DateTime): number

    public abstract setISODay(date: DateTime, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): DateTime

    public abstract parseISO(dateString: string): DateTime

    abstract infinityDateTime: DateTime
    abstract negativeInfinityDateTime: DateTime

    public addDurations = addDurations
    public areIntervalsIntersecting = areIntervalsIntersecting
    public areIntervalsConnected = areIntervalsConnected
    public areIntervalsEqual = areIntervalsEqual
    public joinIntervals = joinIntervals
    public mergeIntervals = mergeIntervals
    public intersectIntervals = intersectIntervals
}
