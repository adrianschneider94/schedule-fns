import {DateTime, Duration, DurationOptions, Interval} from "luxon"
import {DurationObject} from "schedule.js/functions/durations"
import {IntervalAsISOStrings, IntervalObject} from "schedule.js/functions/intervals"
import {DateTimeImplementation} from "schedule.js"

export const LuxonImplementation: DateTimeImplementation<DateTime, Interval, Duration> = {
    InfinityDateTime: DateTime.fromMillis(253402300799999),
    NegInfinityDateTime: DateTime.fromMillis(-253402300799999),

    durationFromDurationObject(duration: DurationObject): Duration {
        return Duration.fromObject(duration)
    },

    /**
     * Converts a duration into milliseconds. Can't be an accurate result as years, months, quarters and days have variable length.
     *
     * @param duration The duration to convert
     *
     * @internal
     */
    roughDurationToMilliseconds(duration: Duration): number {
        return duration.toMillis()
    },

    /**
     * Multiplies a duration with a factor.
     *
     * @param duration
     * @param factor
     *
     * @internal
     */
    multiplyDuration(duration: Duration, factor: number): Duration {
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
            numberingSystem: duration.numberingSystem as DurationOptions["numberingSystem"]
        })
    },

    durationSum(left: Duration, right: Duration): Duration {
        return left.plus(right)
    },

    isEqual(left: DateTime, right: DateTime): boolean {
        return left.toMillis() === right.toMillis()
    },

    compareAsc(left: DateTime, right: DateTime): number {
        return left > right ? 1 : -1
    },

    compareDesc(left: DateTime, right: DateTime): number {
        return left < right ? 1 : -1
    },

    intervalContains(interval: Interval, date: DateTime): boolean {
        return interval.contains(date) || interval.end === date
    },

    intervalToMilliseconds(interval: Interval): number {
        return interval.length("milliseconds")
    },

    dateTimeFromDateOrNumber(date: Date | number) {
        if (date.valueOf() >= this.InfinityDateTime.toMillis()) {
            return this.InfinityDateTime
        } else if (date.valueOf() <= this.NegInfinityDateTime.toMillis()) {
            return this.NegInfinityDateTime
        } else {
            return DateTime.fromJSDate(new Date(date))
        }
    },

    intervalFromIntervalObject(intervalObject: IntervalObject): Interval {
        let startDateTime = intervalObject.start instanceof DateTime ? intervalObject.start : this.dateTimeFromDateOrNumber(intervalObject.start)
        let endDateTime = intervalObject.end instanceof DateTime ? intervalObject.end : this.dateTimeFromDateOrNumber(intervalObject.end)
        return Interval.fromDateTimes(startDateTime, endDateTime)
    },

    intervalFromISOStrings(interval: IntervalAsISOStrings): Interval {
        return Interval.fromDateTimes(this.parseISO(interval.start), this.parseISO(interval.end))
    },

    intersectTwoIntervals(left: Interval, right: Interval): Interval {
        let result = left.intersection(right)
        if (result === null) {
            throw Error("Intervals don't intersect")
        } else {
            return result
        }
    },

    areTwoIntervalsEqual(left: Interval, right: Interval): boolean {
        return left.equals(right)
    },

    joinTwoIntervals(left: Interval, right: Interval): Interval {
        return left.union(right)
    },

    createInterval(start: DateTime, end: DateTime): Interval {
        return Interval.fromDateTimes(start, end)
    },

    addDuration(date: DateTime, duration: Duration): DateTime {
        return date.plus(duration)
    },

    durationDifference(left: Duration, right: Duration): Duration {
        return left.minus(right)
    },

    startOfDay(date: DateTime, timeZone?: string): DateTime {
        if (timeZone) {
            date = date.setZone(timeZone)
        }
        return date.startOf("day")
    },

    addDays(date: DateTime, amount: number): DateTime {
        return date.plus({days: amount})
    },

    isBefore(left: DateTime, right: DateTime, orEqual: boolean = false): boolean {
        return left < right || (orEqual && this.isEqual(left, right))
    },

    isEqualOrBefore(left: DateTime, right: DateTime): boolean {
        return left <= right
    },

    isAfter(left: DateTime, right: DateTime): boolean {
        return left > right
    },

    isEqualOrAfter(left: DateTime, right: DateTime): boolean {
        return left >= right
    },

    isIntervalEmpty(interval: Interval): boolean {
        return interval.isEmpty()
    },

    parseTimeAtGivenDay(timeString: string, day: DateTime, timeZone?: string) {
        let parsedTime = DateTime.fromISO(timeString)
        if (timeZone) {
            day = day.setZone(timeZone)
        }
        return day.set({
            hour: parsedTime.hour,
            minute: parsedTime.minute,
            second: parsedTime.second,
            millisecond: parsedTime.millisecond
        })
    },

    intervalToDuration(interval: Interval): Duration {
        return interval.toDuration(["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"])
    },
    isWithinInterval(date: DateTime, interval: Interval): boolean {
        return interval.contains(date)
    },

    parseJsDateTime(date: Date | number): DateTime {
        return DateTime.fromJSDate(new Date(date))
    },

    getYear(date: DateTime): number {
        return date.year
    },

    differenceInMilliseconds(left: DateTime, right: DateTime) {
        return left.toMillis() - right.toMillis()
    },

    setISODay(date: DateTime, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) {
        return date.set({weekday: day})
    },

    parseISO(date: string): DateTime {
        return DateTime.fromISO(date)
    },

    getStart(interval: Interval): DateTime {
        return interval.start
    },

    getEnd(interval: Interval): DateTime {
        return interval.end
    }
}