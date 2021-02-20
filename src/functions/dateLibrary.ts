import {
    DateInfinity,
    DateTime,
    Duration,
    InfintyDateTime,
    Interval,
    NegDateInfinity,
    NegInfinityDateTime,
    parseISO
} from "../index"
import {DurationObject} from "./durations"
import {DurationOptions} from "luxon"
import {IntervalAsISOStrings, IntervalObject} from "./intervals"

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
        numberingSystem: duration.numberingSystem as DurationOptions["numberingSystem"]
    })
}

export function durationSum(left: Duration, right: Duration): Duration {
    return left.plus(right)
}

export function isEqual(left: DateTime, right: DateTime): boolean {
    return left.toMillis() === right.toMillis()
}

export function compareAsc(left: DateTime, right: DateTime): number {
    return left > right ? 1 : -1
}

export function compareDesc(left: DateTime, right: DateTime): number {
    return left < right ? 1 : -1
}

export function intervalContains(interval: Interval, date: DateTime): boolean {
    return interval.contains(date) || interval.end === date
}

export function intervalToMilliseconds(interval: Interval): number {
    return interval.length("milliseconds")
}

export function dateTimeFromDateOrNumber(date: Date | number) {
    if (date.valueOf() === DateInfinity || date.valueOf() === Infinity) {
        return InfintyDateTime
    } else if (date.valueOf() === NegDateInfinity || date.valueOf() === -Infinity) {
        return NegInfinityDateTime
    } else {
        return DateTime.fromJSDate(new Date(date))
    }
}

export function intervalFromIntervalObject(intervalObject: IntervalObject): Interval {
    let startDateTime = intervalObject.start instanceof DateTime ? intervalObject.start : dateTimeFromDateOrNumber(intervalObject.start)
    let endDateTime = intervalObject.end instanceof DateTime ? intervalObject.end : dateTimeFromDateOrNumber(intervalObject.end)
    return Interval.fromDateTimes(startDateTime, endDateTime)
}

export function intervalFromISOStrings(interval: IntervalAsISOStrings): Interval {
    return Interval.fromDateTimes(parseISO(interval.start), parseISO(interval.end))
}

export function intersectTwoIntervals(left: Interval, right: Interval): Interval {
    let result = left.intersection(right)
    if (result === null) {
        throw Error("Intervals don't intersect")
    } else {
        return result
    }
}

export function areTwoIntervalsEqual(left: Interval, right: Interval): boolean {
    return left.equals(right)
}

export function joinTwoIntervals(left: Interval, right: Interval): Interval {
    return left.union(right)
}

export function createInterval(start: DateTime, end: DateTime): Interval {
    return Interval.fromDateTimes(start, end)
}

export function addDuration(date: DateTime, duration: Duration): DateTime {
    return date.plus(duration)
}

export function startOfDay(date: DateTime, timeZone?: string): DateTime {
    if (timeZone) {
        date = date.setZone(timeZone)
    }
    return date.startOf("day")
}

export function addDays(date: DateTime, amount: number): DateTime {
    return date.plus({days: amount})
}

export function isBefore(left: DateTime, right: DateTime, orEqual: boolean = false): boolean {
    return left < right || (orEqual && isEqual(left, right))
}

export function isEqualOrBefore(left: DateTime, right: DateTime): boolean {
    return left <= right
}

export function isAfter(left: DateTime, right: DateTime, orEqual: boolean = false): boolean {
    return left > right || (orEqual && isEqual(left, right))
}

export function isEqualOrAfter(left: DateTime, right: DateTime): boolean {
    return left >= right
}

export function isIntervalEmpty(interval: Interval): boolean {
    return interval.isEmpty()
}

export function parseTimeAtGivenDay(timeString: string, day: DateTime, timeZone?: string) {
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
}