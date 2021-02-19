import {DateTime, Interval} from "../index"
import {dateTimeFromDateOrNumber, isEmpty, parseISO} from "./misc"

export type IntervalObject = {
    start: Date | number | DateTime
    end: Date | number | DateTime
}

export type IntervalAsISOStrings = {
    start: string
    end: string
}

export function intervalFromIntervalObject(intervalObject: IntervalObject) {
    let startDateTime = intervalObject.start instanceof DateTime ? intervalObject.start : dateTimeFromDateOrNumber(intervalObject.start)
    let endDateTime = intervalObject.end instanceof DateTime ? intervalObject.end : dateTimeFromDateOrNumber(intervalObject.end)
    return Interval.fromDateTimes(startDateTime, endDateTime)
}

export function intervalFromISOStrings(interval: IntervalAsISOStrings) {
    return Interval.fromDateTimes(parseISO(interval.start), parseISO(interval.end))
}

/**
 * Determines if the given intervals are intersecting.
 *
 * If true, all given intervals intersect with each other.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function areIntervalsIntersecting(...intervals: Array<Interval>): boolean {
    if (isEmpty(intervals) || intervals.length === 1) {
        return true
    }
    return intervals.every(left => intervals.every(right => left.intersection(right) !== null))
}

/**
 * Determines if the union of all intervals forms a single interval.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function areIntervalsConnected(...intervals: Array<Interval>): boolean {
    if (isEmpty(intervals)) {
        return true
    }
    return intervals.every((left, i) => intervals.some((right, j) => (left.intersection(right) !== null) && (i !== j)))
}

/**
 * Determines if all given intervals are equal.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function areIntervalsEqual(...intervals: Array<Interval>): boolean {
    if (isEmpty(intervals)) {
        return true
    }
    return intervals.every(interval => (interval.equals(intervals[0])))
}

/**
 * Returns the union of connected intervals.
 *
 * If the intervals are not connected (i.e. the form not a single interval but multiple), an error is thrown.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function joinIntervals(...intervals: Array<Interval>): Interval {
    if (isEmpty(intervals)) {
        throw Error("Need to provide at least one interval to join.")
    }
    if (!areIntervalsConnected(...intervals)) {
        throw Error("Can't join intervals as they are disjoint!")
    }
    return intervals.reduce((aggregate, current) => aggregate.union(current))
}

/**
 * Returns a union (array of intervals) of disjoint intervals.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function mergeIntervals(...intervals: Array<Interval>): Array<Interval> {
    if (isEmpty(intervals)) {
        return []
    }

    function reducer(aggregate: Array<Interval>, currentValue: Interval): Array<Interval> {
        let lastInterval = aggregate.slice(-1)[0]
        if (areIntervalsConnected(lastInterval, currentValue)) {
            return [...aggregate.slice(0, -1), joinIntervals(lastInterval, currentValue)]
        } else {
            return [...aggregate, currentValue]
        }
    }

    let sortedIntervals = [...intervals].sort((a, b) => a.start > b.start ? 1 : -1)
    return sortedIntervals.slice(1).reduce(reducer, [sortedIntervals[0]])
}

/**
 * Returns the intersection of a set of intervals.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function intersectIntervals(...intervals: Array<Interval>): Interval {
    if (isEmpty(intervals)) {
        throw Error("Please provide at least one interval!")
    }
    let result = intervals.reduce<Interval | null>((aggregate, current) => aggregate === null ? null : aggregate.intersection(current), intervals[0])
    if (!result) {
        throw Error("Can't intersect the given intervals!")
    } else {
        return result
    }
}