import {DateTime, Duration, DurationOptions, Interval} from "luxon"
import {DateTimeImplementation} from "schedule.js"

export type LuxonTypes = {
    datetime: DateTime
    interval: Interval
    duration: Duration
}

export const LuxonImplementation: DateTimeImplementation<LuxonTypes> = {
    InfinityDateTime: DateTime.fromMillis(253402300799999),
    NegInfinityDateTime: DateTime.fromMillis(-253402300799999),

    durationFromDurationObject(duration) {
        return Duration.fromObject(duration)
    },

    /**
     * Converts a duration into milliseconds. Can't be an accurate result as years, months, quarters and days have variable length.
     *
     * @param duration The duration to convert
     *
     * @internal
     */
    roughDurationToMilliseconds(duration) {
        return duration.toMillis()
    },

    multiplyDuration(duration, factor) {
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

    durationSum(left, right) {
        return left.plus(right)
    },

    isEqual(left, right) {
        return left.toMillis() === right.toMillis()
    },

    compareAsc(left, right) {
        return left > right ? 1 : -1
    },

    compareDesc(left, right) {
        return left < right ? 1 : -1
    },

    intervalContains(interval, date) {
        return interval.contains(date) || interval.end === date
    },

    intervalToMilliseconds(interval) {
        return interval.length("milliseconds")
    },


    intervalFromISOStrings(interval) {
        return Interval.fromDateTimes(this.parseISO(interval.start), this.parseISO(interval.end))
    },

    intersectTwoIntervals(left, right) {
        let result = left.intersection(right)
        if (result === null) {
            throw Error("Intervals don't intersect")
        } else {
            return result
        }
    },

    areTwoIntervalsEqual(left, right) {
        return left.equals(right)
    },

    joinTwoIntervals(left, right) {
        return left.union(right)
    },

    createInterval(start, end) {
        return Interval.fromDateTimes(start, end)
    },

    addDuration(date, duration) {
        return date.plus(duration)
    },

    durationDifference(left, right) {
        return left.minus(right)
    },

    startOfDay(date, timeZone?) {
        if (timeZone) {
            date = date.setZone(timeZone)
        }
        return date.startOf("day")
    },

    addDays(date, amount) {
        return date.plus({days: amount})
    },

    isBefore(left: DateTime, right: DateTime, orEqual: boolean = false): boolean {
        return left < right || (orEqual && this.isEqual(left, right))
    },

    isEqualOrBefore(left, right) {
        return left <= right
    },

    isAfter(left, right) {
        return left > right
    },

    isEqualOrAfter(left, right) {
        return left >= right
    },

    isIntervalEmpty(interval) {
        return interval.isEmpty()
    },

    parseTimeAtGivenDay(timeString, day, timeZone) {
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

    intervalToDuration(interval) {
        return interval.toDuration(["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"])
    },
    isWithinInterval(date, interval) {
        return interval.contains(date)
    },

    parseJsDateTime(date) {
        return DateTime.fromJSDate(new Date(date))
    },

    getYear(date) {
        return date.year
    },

    differenceInMilliseconds(left, right) {
        return left.toMillis() - right.toMillis()
    },

    setISODay(date, day) {
        return date.set({weekday: day})
    },

    parseISO(date) {
        return DateTime.fromISO(date)
    },

    getStart(interval) {
        return interval.start
    },

    getEnd(interval) {
        return interval.end
    },

    areDurationsEqual(left: LuxonTypes["duration"], right: LuxonTypes["duration"]): boolean {
        return left.equals(right)
    },
}