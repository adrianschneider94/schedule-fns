import {DateInfinity} from "../index"

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