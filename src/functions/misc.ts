import {DateTime, direction, Interval, Schedule} from "../index"
import {intervalContains} from "./dateLibrary"

/**
 * Determines if an array is empty.
 *
 * @param array
 * @internal
 * @category Miscellaneous
 */
export function isArrayEmpty<T>(array: Array<T>) {
    return array.length === 0
}

/**
 * Determines if a given date is within a schedule.
 *
 * @param date
 * @param schedule
 * @category Helper functions
 */
export function isWithinSchedule(date: DateTime, schedule: Schedule) {
    let generator = schedule(date)
    let interval = generator.next()?.value as Interval | undefined

    if (interval === undefined) {
        return false
    }

    return intervalContains(interval, date)
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

export function parseTimeAtGivenDay(timeString: string, day: DateTime) {
    let parsedTime = DateTime.fromISO(timeString)
    return day.set({
        hour: parsedTime.hour,
        minute: parsedTime.minute,
        second: parsedTime.second,
        millisecond: parsedTime.millisecond
    })
}

export function isWithinInterval(date: DateTime, interval: Interval) {
    return interval.contains(date)
}

export function parseJsDateTime(date: Date | number): DateTime {
    return DateTime.fromJSDate(new Date(date))
}

export function getYear(date: DateTime) {
    return date.year
}

export function differenceInMilliseconds(left: DateTime, right: DateTime) {
    return left.toMillis() - right.toMillis()
}

export function setISODay(date: DateTime, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    return date.set({weekday: day})
}

export function parseISO(date: string): DateTime {
    return DateTime.fromISO(date)
}