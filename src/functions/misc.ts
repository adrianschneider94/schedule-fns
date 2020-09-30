import {isWithinInterval, parse, parseISO} from "date-fns"

import {DateInfinity, direction, Interval, Schedule} from "../index"

/**
 * Determines if an array is empty.
 *
 * @param array
 * @internal
 * @category Miscellaneous
 */
export function isEmpty<T>(array: Array<T>) {
    return array.length === 0
}

/**
 * Transforms Infinity into the maximal number, a date can have in javascript (DateInfinity)
 *
 * @param date
 * @internal
 * @category Miscellaneous
 */
export function catchInfiniteDate(date: Date | number): Date | number {
    if (date === Infinity) {
        return new Date(DateInfinity)
    } else if (date === -Infinity) {
        return new Date(-DateInfinity)
    } else {
        return date
    }
}

/**
 * Transforms Infinity into DateInfinity for intervals.
 *
 * @param interval
 * @internal
 * @category Miscellaneous
 */
export function catchInfiniteInterval(interval: Interval): Interval {
    return {
        start: catchInfiniteDate(interval.start),
        end: catchInfiniteDate(interval.end)
    }
}


/**
 * Determines if a given date is within a schedule.
 *
 * @param date
 * @param schedule
 * @category Helper functions
 */
export function isWithinSchedule(date: Date | number, schedule: Schedule) {
    let generator = schedule(date)
    let interval = generator.next()?.value

    if (interval === undefined) {
        return false
    }

    return isWithinInterval(date, interval)
}

/**
 * Convert "forward" and "backward" into 1 and -1 respectively.
 *
 * @param direction
 * @category Miscellaneous
 * @internal
 */
export function directionToInt(direction: direction): 1 | -1 {
    if (direction === "forward") {
        return 1
    } else if (direction === "backward") {
        return -1
    } else if (direction === 1) {
        return 1
    } else if (direction === -1) {
        return -1
    } else {
        throw Error(`${direction} is not a valid direction.`)
    }
}

/**
 * Remove the time portion of a date.
 *
 * @param date
 * @category Miscellaneous
 * @internal
 */
export function stripTime(date: Date | number) {
    return parseISO((new Date(date)).toISOString().slice(0, 11) + "00:00:00Z")
}

/**
 * Get the system timezone.
 *
 * @category Helper functions
 */
export function getUserTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Takes a time string and a format string and returns an string with the time portion of the ISO format.
 *
 * @param time
 * @param format
 * @internal
 */
export function isoFormatTime(time: string, format: string): string {
    if (format.indexOf('x') !== -1 || format.indexOf('X') !== -1) {
        throw Error("Can only parse time without timezone information.")
    }
    let timeAsDate = parse(time + "Z", format + "X", new Date(0))
    return timeAsDate.toISOString().slice(11, -1)
}

/**
 * Take the first n elements from an iterator.
 *
 * @param iterable
 * @param n
 */
export function* take<T>(iterable: IterableIterator<T>, n: number): IterableIterator<T> {
    let i = 0
    for (let value of iterable) {
        i++
        if (i > n) {
            break
        }
        yield value
    }
}