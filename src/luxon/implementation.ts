import {DateTime as LuxonDateTime, DateTime, Duration, DurationOptions, Interval} from "luxon"
import {DurationObject, IntervalAsISOStrings, IntervalObject} from "schedule.js"
import {ScheduleFnsLibrary} from "../abstract"

const DateInfinity = 253402300799999
const NegDateInfinity = -253402300799999


export class LuxonImplementation extends ScheduleFnsLibrary<DateTime, Interval, Duration> {
    infinityDateTime: DateTime = LuxonDateTime.fromMillis(DateInfinity)
    negativeInfinityDateTime: DateTime = LuxonDateTime.fromMillis(NegDateInfinity)

    public durationFromDurationObject(duration: DurationObject): Duration {
        return Duration.fromObject(duration)
    }

    public durationToMilliseconds(duration: Duration): number {
        return duration.toMillis()
    }

    public multiplyDuration(duration: Duration, factor: number): Duration {
        let args = {
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
        }
        return Duration.fromObject(args)
    }

    public durationSum(left: Duration, right: Duration): Duration {
        return left.plus(right)
    }

    public isEqual(left: DateTime, right: DateTime): boolean {
        return left.toMillis() === right.toMillis()
    }

    public compareAsc(left: DateTime, right: DateTime): number {
        return left > right ? 1 : -1
    }

    public compareDesc(left: DateTime, right: DateTime): number {
        return left < right ? 1 : -1
    }

    public intervalContains(interval: Interval, date: DateTime): boolean {
        return interval.contains(date) || interval.end === date
    }

    public intervalToMilliseconds(interval: Interval): number {
        return interval.length("milliseconds")
    }

    public dateTimeFromDateOrNumber(date: Date | number) {
        if (date.valueOf() === DateInfinity || date.valueOf() === Infinity) {
            return this.infinityDateTime
        } else if (date.valueOf() === NegDateInfinity || date.valueOf() === -Infinity) {
            return this.negativeInfinityDateTime
        } else {
            return DateTime.fromJSDate(new Date(date))
        }
    }

    public intervalFromIntervalObject(intervalObject: IntervalObject): Interval {
        let startDateTime = this.dateTimeFromDateOrNumber(intervalObject.start)
        let endDateTime = this.dateTimeFromDateOrNumber(intervalObject.end)
        return Interval.fromDateTimes(startDateTime, endDateTime)
    }

    public intervalFromISOStrings(interval: IntervalAsISOStrings): Interval {
        return Interval.fromDateTimes(DateTime.fromISO(interval.start), DateTime.fromISO(interval.end))
    }

    public intersectTwoIntervals(left: Interval, right: Interval): Interval {
        let result = left.intersection(right)
        if (result === null) {
            throw Error("Intervals don't intersect")
        } else {
            return result
        }
    }

    public areTwoIntervalsEqual(left: Interval, right: Interval): boolean {
        return left.equals(right)
    }

    public joinTwoIntervals(left: Interval, right: Interval): Interval {
        return left.union(right)
    }

    public createInterval(start: DateTime, end: DateTime): Interval {
        return Interval.fromDateTimes(start, end)
    }

    public addDuration(date: DateTime, duration: Duration): DateTime {
        return date.plus(duration)
    }

    public startOfDay(date: DateTime, timeZone?: string): DateTime {
        if (timeZone) {
            date = date.setZone(timeZone)
        }
        return date.startOf("day")
    }

    public addDays(date: DateTime, amount: number): DateTime {
        return date.plus({days: amount})
    }

    public isBefore(left: DateTime, right: DateTime, orEqual: boolean = false): boolean {
        return left < right || (orEqual && this.isEqual(left, right))
    }

    public isEqualOrBefore(left: DateTime, right: DateTime): boolean {
        return left <= right
    }

    public isAfter(left: DateTime, right: DateTime, orEqual: boolean = false): boolean {
        return left > right || (orEqual && this.isEqual(left, right))
    }

    public isEqualOrAfter(left: DateTime, right: DateTime): boolean {
        return left >= right
    }

    public isIntervalEmpty(interval: Interval): boolean {
        return interval.isEmpty()
    }

    public parseTimeAtGivenDay(timeString: string, day: DateTime, timeZone?: string) {
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

    public getIntervalStart(interval: Interval): DateTime {
        return interval.start
    }

    public getIntervalEnd(interval: Interval): DateTime {
        return interval.end
    }

    public getYear(date: DateTime): number {
        return date.year
    }

    setISODay(date: DateTime, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): DateTime {
        return date.set({weekday: day})
    }
}

export const LuxonScheduleFns = new LuxonImplementation()