import {DateInfinity, direction, Schedule} from "../index"
import {isWithinInterval, parseISO} from "date-fns"

export function isEmpty<T>(array: Array<T>) {
    return array.length === 0
}

export function catchInfiniteDate(date: Date | number): Date | number {
    if (date === Infinity) {
        return new Date(DateInfinity)
    } else if (date === -Infinity) {
        return new Date(-DateInfinity)
    } else {
        return date
    }
}

export function catchInfiniteInterval(interval: Interval): Interval {
    return {
        start: catchInfiniteDate(interval.start),
        end: catchInfiniteDate(interval.end)
    }
}

export function isWithinSchedule(date: Date | number, schedule: Schedule) {
    let generator = schedule(date)
    let interval = generator.next().value
    return isWithinInterval(date, interval)
}

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

export function stripTime(date: Date | number) {
    return parseISO((new Date(date)).toISOString().slice(0, 11) + "00:00:00Z")
}

export function getUserTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}