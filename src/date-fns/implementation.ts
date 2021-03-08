import {DateTimeImplementation} from "schedule.js"
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

function orZero(value?: number): number {
    return value !== undefined ? value : 0
}

export type DateFnsTypes = {
    datetime: Date | number
    interval: Interval
    duration: Duration
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


const InfinityDateTime = new Date(8640000000000000)
const NegInfinityDateTime = new Date(-8640000000000000)

function catchInfinity(date: Date | number) {
    if (date.valueOf() >= InfinityDateTime.valueOf()) {
        return InfinityDateTime
    } else if (date.valueOf() <= NegInfinityDateTime.valueOf()) {
        return NegInfinityDateTime
    } else {
        return date
    }
}

export const DateFnsImplementation: DateTimeImplementation<DateFnsTypes> = {
    InfinityDateTime: InfinityDateTime,
    NegInfinityDateTime: NegInfinityDateTime,


    durationFromDurationObject(duration) {
        return {
            years: orZero(duration?.years),
            months: orZero(duration?.months) + orZero(duration.quarters) * 3,
            weeks: orZero(duration?.weeks),
            days: orZero(duration?.days),
            hours: orZero(duration?.hours),
            minutes: orZero(duration?.minutes),
            seconds: orZero(duration?.seconds) + orZero(duration.milliseconds) / 1000
        }
    },

    /**
     * Converts a duration into milliseconds. Can't be an accurate result as years, months, quarters and days have variable length.
     *
     * @param duration The duration to convert
     *
     * @internal
     */
    roughDurationToMilliseconds(duration) {
        let inMilliseconds = {
            years: orZero(duration?.years) * 3.154e+10,
            months: orZero(duration?.months) * 2.628e+9,
            weeks: orZero(duration?.weeks) * 604799337.206211686,
            days: orZero(duration?.days) * 86399905.315173104405,
            hours: orZero(duration?.hours) * 3600000,
            minutes: orZero(duration?.minutes) * 60000,
            seconds: orZero(duration?.seconds) * 1000,
        }
        return Object.values(inMilliseconds).reduce((a, b) => a + b)
    },

    multiplyDuration(duration, factor) {
        return {
            years: orZero(duration?.years) * factor,
            months: orZero(duration?.months) * factor,
            weeks: orZero(duration?.weeks) * factor,
            days: orZero(duration?.days) * factor,
            hours: orZero(duration?.hours) * factor,
            minutes: orZero(duration?.minutes) * factor,
            seconds: orZero(duration?.seconds) * factor,
        }
    },

    durationSum(left, right) {
        return {
            years: orZero(left?.years) + orZero(right?.years),
            months: orZero(left?.months) + orZero(right?.months),
            weeks: orZero(left?.weeks) + orZero(right?.weeks),
            days: orZero(left?.days) + orZero(right?.days),
            hours: orZero(left?.hours) + orZero(right?.hours),
            minutes: orZero(left?.minutes) + orZero(right?.minutes),
            seconds: orZero(left?.seconds) + orZero(right?.seconds),
        }
    },

    isEqual(left, right) {
        return left.valueOf() === right.valueOf()
    },

    compareAsc(left, right) {
        return left.valueOf() > right.valueOf() ? 1 : -1
    },

    compareDesc(left, right) {
        return left.valueOf() < right.valueOf() ? 1 : -1
    },

    intervalContains(interval, date) {
        return isWithinInterval(date, interval)
    },

    intervalToMilliseconds(interval) {
        return differenceInMilliseconds(interval.end, interval.start)
    },

    intervalFromISOStrings(interval) {
        return {
            start: parseISO(interval.start),
            end: parseISO(interval.end)
        }
    },

    intersectTwoIntervals(left, right) {
        if (areIntervalsOverlapping(left, right, {inclusive: true})) {
            return {
                start: Math.max(left.start.valueOf(), right.start.valueOf()),
                end: Math.min(left.end.valueOf(), right.end.valueOf())
            }
        } else {
            throw Error("Intervals don't intersect")
        }
    },

    areTwoIntervalsEqual(left, right) {
        return left.start.valueOf() === right.start.valueOf() && left.end.valueOf() === right.end.valueOf()
    },

    joinTwoIntervals(left, right) {
        if (areIntervalsOverlapping(left, right, {inclusive: true})) {
            return {
                start: Math.min(left.start.valueOf(), right.start.valueOf()),
                end: Math.max(left.end.valueOf(), right.end.valueOf())
            }
        } else {
            throw Error("Intervals don't overlap!")
        }
    },

    createInterval(start, end) {
        return {
            start: catchInfinity(start),
            end: catchInfinity(end)
        }
    },

    addDuration(date, duration) {
        return add(date, duration)
    },

    durationDifference(left, right) {
        return {
            years: orZero(left.years) - orZero(right.years),
            months: orZero(left.months) - orZero(right.months),
            weeks: orZero(left.weeks) - orZero(right.weeks),
            days: orZero(left.days) - orZero(right.days),
            hours: orZero(left.hours) - orZero(right.hours),
            minutes: orZero(left.minutes) - orZero(right.minutes),
            seconds: orZero(left.seconds) - orZero(right.seconds),
        }
    },

    startOfDay(date, timeZone) {
        if (timeZone) {
            throw Error("date-fns implementation doesn't support time zones!")
        }
        return startOfDay(date)
    },

    addDays(date, amount) {
        return addDays(date, amount)
    },

    isBefore(left, right) {
        return left < right
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
        return interval.start === interval.end
    },

    parseTimeAtGivenDay(timeString, day, timeZone) {
        if (timeZone) {
            throw Error("date-fns implementation doesn't support time zones!")
        }
        let dayString = formatISO(day).split("T")[0]
        return parseISO(dayString + "T" + timeString)
    },

    intervalToDuration(interval) {
        return intervalToDuration(interval)
    },
    isWithinInterval(date, interval) {
        return isWithinInterval(date, interval)
    },

    parseJsDateTime(date) {
        return date
    },

    getYear(date) {
        return getYear(date)
    },

    differenceInMilliseconds(left, right) {
        return left.valueOf() - right.valueOf()
    },

    setISODay(date, day) {
        return setISODay(date, day)
    },

    parseISO(date) {
        return parseISO(date)
    },

    getStart(interval) {
        return interval.start
    },

    getEnd(interval) {
        return interval.end
    },

    areDurationsEqual(left, right) {
        left = normalizeDuration(left)
        right = normalizeDuration(right)
        return (orZero(left.years) === orZero(right.years)) &&
            (orZero(left.months) === orZero(right.months)) &&
            (orZero(left.weeks) === orZero(right.weeks)) &&
            (orZero(left.days) == orZero(right.days)) &&
            (orZero(left.hours) === orZero(right.hours)) &&
            (orZero(left.minutes) === orZero(right.minutes)) &&
            (orZero(left.seconds) === orZero(right.seconds))
    },

    toISO(date: DateFnsTypes["datetime"]): string {
        return formatISO(date)
    },

    intervalToIso(interval: DateFnsTypes["interval"]): string {
        return this.toISO(interval.start) + "/" + this.toISO(interval.end)
    },

    durationToIso(duration) {
        return formatISODuration(duration)
    }
}