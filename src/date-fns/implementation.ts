import {
    add,
    addDays,
    areIntervalsOverlapping,
    differenceInMilliseconds,
    Duration,
    formatISO,
    formatISODuration,
    getYear,
    Interval,
    intervalToDuration,
    isWithinInterval,
    parseISO,
    setISODay,
    startOfDay
} from "date-fns"
import {DurationObject, IntervalAsISOStrings, IntervalObject} from "schedule.js"
import {ScheduleFnsLibrary} from "../abstract"

const DateInfinity = 8640000000000000
const NegDateInfinity = -8640000000000000

function orZero(value?: number): number {
    return value !== undefined ? value : 0
}

function normalizeDuration(duration: Duration): Duration {
    let seconds = orZero(duration.seconds)
    let pureSeconds = Math.sign(seconds) * (Math.abs(seconds) % 60)
    let minutes_from_seconds = Math.sign(seconds) * Math.floor(Math.abs(seconds / 60))

    let minutes = orZero(duration.minutes) + minutes_from_seconds
    let pureMinutes = Math.sign(minutes) * (Math.abs(minutes) % 60)
    let hoursFromMinutes = Math.sign(minutes) * Math.floor(Math.abs(minutes) / 60)

    let hours = orZero(duration.hours) + hoursFromMinutes
    let pureHours = Math.sign(hours) * (Math.abs(hours) % 24)
    let daysFromHours = Math.sign(hours) * Math.floor(Math.abs(hours) / 24)

    let days = orZero(duration.days) + daysFromHours

    let months = orZero(duration.months)
    let pureMonths = Math.sign(months) * (Math.abs(months) % 12)
    let yearsFromMonths = Math.sign(months) * Math.floor(Math.abs(months) / 12)

    let years = orZero(duration.years) + yearsFromMonths

    return {
        seconds: pureSeconds,
        minutes: pureMinutes,
        hours: pureHours,
        days: days,
        months: pureMonths,
        years: years
    }
}

export class DateFnsImplementation extends ScheduleFnsLibrary<Date | number, Interval, Duration> {

    infinityDateTime: Date | number = new Date(DateInfinity)
    negativeInfinityDateTime: Date | number = new Date(NegDateInfinity)

    public catchInfinity(date: Date | number) {
        if (date.valueOf() >= this.infinityDateTime.valueOf()) {
            return this.infinityDateTime
        } else if (date.valueOf() <= this.negativeInfinityDateTime.valueOf()) {
            return this.negativeInfinityDateTime
        } else {
            return date
        }
    }

    public durationFromDurationObject(duration: DurationObject) {
        return {
            years: orZero(duration?.years),
            months: orZero(duration?.months) + orZero(duration.quarters) * 3,
            weeks: orZero(duration?.weeks),
            days: orZero(duration?.days),
            hours: orZero(duration?.hours),
            minutes: orZero(duration?.minutes),
            seconds: orZero(duration?.seconds) + orZero(duration.milliseconds) / 1000
        }
    }

    public roughDurationToMilliseconds(duration: Duration) {
        let inMilliseconds = {
            years: orZero(duration?.years) * 3.154e+10,
            months: orZero(duration?.months) * 2.628e+9,
            weeks: orZero(duration?.weeks) * 604799337.206211686,
            days: orZero(duration?.days) * 86399905.315173104405,
            hours: orZero(duration?.hours) * 3600000,
            minutes: orZero(duration?.minutes) * 60000,
            seconds: orZero(duration?.seconds) * 1000
        }
        return Object.values(inMilliseconds).reduce((a, b) => a + b)
    }

    public multiplyDuration(duration: Duration, factor: number) {
        return {
            years: orZero(duration?.years) * factor,
            months: orZero(duration?.months) * factor,
            weeks: orZero(duration?.weeks) * factor,
            days: orZero(duration?.days) * factor,
            hours: orZero(duration?.hours) * factor,
            minutes: orZero(duration?.minutes) * factor,
            seconds: orZero(duration?.seconds) * factor
        }
    }

    public durationSum(left: Duration, right: Duration) {
        return {
            years: orZero(left?.years) + orZero(right?.years),
            months: orZero(left?.months) + orZero(right?.months),
            weeks: orZero(left?.weeks) + orZero(right?.weeks),
            days: orZero(left?.days) + orZero(right?.days),
            hours: orZero(left?.hours) + orZero(right?.hours),
            minutes: orZero(left?.minutes) + orZero(right?.minutes),
            seconds: orZero(left?.seconds) + orZero(right?.seconds)
        }
    }

    public isEqual(left: Date | number, right: Date | number) {
        return left.valueOf() === right.valueOf()
    }

    public compareAsc(left: Date | number, right: Date | number) {
        return left.valueOf() > right.valueOf() ? 1 : -1
    }

    public compareDesc(left: Date | number, right: Date | number) {
        return left.valueOf() < right.valueOf() ? 1 : -1
    }

    public intervalContains(interval: Interval, date: Date | number) {
        return isWithinInterval(date, interval)
    }

    public intervalToMilliseconds(interval: Interval) {
        return differenceInMilliseconds(interval.end, interval.start)
    }

    public intervalFromISOStrings(interval: IntervalAsISOStrings) {
        return {
            start: parseISO(interval.start),
            end: parseISO(interval.end)
        }
    }

    public intersectTwoIntervals(left: Interval, right: Interval) {
        if (areIntervalsOverlapping(left, right, {inclusive: true})) {
            return {
                start: Math.max(left.start.valueOf(), right.start.valueOf()),
                end: Math.min(left.end.valueOf(), right.end.valueOf())
            }
        } else {
            throw Error("Intervals don't intersect")
        }
    }

    public areTwoIntervalsEqual(left: Interval, right: Interval) {
        return left.start.valueOf() === right.start.valueOf() && left.end.valueOf() === right.end.valueOf()
    }

    public joinTwoIntervals(left: Interval, right: Interval) {
        if (areIntervalsOverlapping(left, right, {inclusive: true})) {
            return {
                start: Math.min(left.start.valueOf(), right.start.valueOf()),
                end: Math.max(left.end.valueOf(), right.end.valueOf())
            }
        } else {
            throw Error("Intervals don't overlap!")
        }
    }

    public createInterval(start: Date | number, end: Date | number) {
        return {
            start: this.catchInfinity(start),
            end: this.catchInfinity(end)
        }
    }

    public addDuration(date: Date | number, duration: Duration) {
        return add(date, duration)
    }

    public durationDifference(left: Duration, right: Duration) {
        return {
            years: orZero(left.years) - orZero(right.years),
            months: orZero(left.months) - orZero(right.months),
            weeks: orZero(left.weeks) - orZero(right.weeks),
            days: orZero(left.days) - orZero(right.days),
            hours: orZero(left.hours) - orZero(right.hours),
            minutes: orZero(left.minutes) - orZero(right.minutes),
            seconds: orZero(left.seconds) - orZero(right.seconds)
        }
    }

    public startOfDay(date: Date | number, timeZone?: string) {
        if (timeZone) {
            throw Error("date-fns implementation doesn't support time zones!")
        }
        return startOfDay(date)
    }

    public addDays(date: Date | number, amount: number) {
        return addDays(date, amount)
    }

    public isBefore(left: Date | number, right: Date | number) {
        return left < right
    }

    public isEqualOrBefore(left: Date | number, right: Date | number) {
        return left <= right
    }

    public isAfter(left: Date | number, right: Date | number) {
        return left > right
    }

    public isEqualOrAfter(left: Date | number, right: Date | number) {
        return left >= right
    }

    public isIntervalEmpty(interval: Interval) {
        return interval.start === interval.end
    }

    public parseTimeAtGivenDay(timeString: string, day: Date | number, timeZone?: string) {
        if (timeZone) {
            throw Error("date-fns implementation doesn't support time zones!")
        }
        let dayString = formatISO(day).split("T")[0]
        return parseISO(dayString + "T" + timeString)
    }

    public intervalToDuration(interval: Interval) {
        return intervalToDuration(interval)
    }

    public isWithinInterval(date: Date | number, interval: Interval) {
        return isWithinInterval(date, interval)
    }

    public parseJsDateTime(date: Date | number) {
        return date
    }

    public getYear(date: Date | number) {
        return getYear(date)
    }

    public differenceInMilliseconds(left: Date | number, right: Date | number) {
        return left.valueOf() - right.valueOf()
    }

    public setISODay(date: Date | number, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) {
        return setISODay(date, day)
    }

    public parseISO(date: string) {
        return parseISO(date)
    }

    public areDurationsEqual(left: Duration, right: Duration) {
        left = normalizeDuration(left)
        right = normalizeDuration(right)
        return (orZero(left.years) === orZero(right.years)) &&
            (orZero(left.months) === orZero(right.months)) &&
            (orZero(left.weeks) === orZero(right.weeks)) &&
            (orZero(left.days) == orZero(right.days)) &&
            (orZero(left.hours) === orZero(right.hours)) &&
            (orZero(left.minutes) === orZero(right.minutes)) &&
            (orZero(left.seconds) === orZero(right.seconds))
    }

    public toISO(date: Date | number): string {
        return date === Infinity ? "Infinity" : date === -Infinity ? "-Infinity" : formatISO(date)
    }

    public intervalToIso(interval: Interval): string {
        return this.toISO(interval.start) + "/" + this.toISO(interval.end)
    }

    public durationToIso(duration: Duration) {
        return formatISODuration(duration)
    }

    public durationToMilliseconds(duration: Duration): number {
        return this.roughDurationToMilliseconds(duration)
    }

    public dateTimeFromDateOrNumber(date: number | Date): number | Date {
        return new Date(date)
    }

    public intervalFromIntervalObject(intervalObject: IntervalObject): globalThis.Interval {
        return {
            start: this.catchInfinity(intervalObject.start),
            end: this.catchInfinity(intervalObject.end)
        }
    }

    public getIntervalStart(interval: Interval): number | Date {
        return interval.start
    }

    public getIntervalEnd(interval: Interval): number | Date {
        return interval.end
    }
}

export const DateFnsScheduleFns = new DateFnsImplementation()