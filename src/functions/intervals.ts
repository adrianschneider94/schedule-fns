import {compareAsc, compareDesc, isEqual} from "date-fns"

import {Interval} from "../index"
import {catchInfiniteInterval, isEmpty} from "./misc"

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
    return intervals.every(left => intervals.every(right => left.start <= right.end))
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
    intervals = intervals.map(catchInfiniteInterval)
    return intervals.every((leftInterval, i) => intervals.some((rightInterval, j) => (compareAsc(leftInterval.start, rightInterval.end) <= 0) && (i !== j)))
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
    intervals = intervals.map(catchInfiniteInterval)
    return intervals.every(interval => isEqual(interval.start, intervals[0].start)) && intervals.every(interval => isEqual(interval.end, intervals[0].end))
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
    intervals = intervals.map(catchInfiniteInterval)
    if (!areIntervalsConnected(...intervals)) {
        throw Error("Can't join intervals as they are disjoint!")
    }
    return {
        start: [...intervals].sort((a, b) => compareAsc(a.start, b.start))[0].start,
        end: [...intervals].sort((a, b) => compareDesc(a.end, b.end))[0].end
    }
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
    intervals = intervals.map(catchInfiniteInterval)

    function reducer(aggregate: Array<Interval>, currentValue: Interval): Array<Interval> {
        let lastInterval = aggregate.slice(-1)[0]
        if (areIntervalsConnected(lastInterval, currentValue)) {
            return [...aggregate.slice(0, -1), joinIntervals(lastInterval, currentValue)]
        } else {
            return [...aggregate, currentValue]
        }
    }

    let sortedIntervals = [...intervals].sort((a, b) => compareAsc(a.start, b.start))
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
    if (!areIntervalsIntersecting(...intervals)) {
        throw Error("Can't intersect the given intervals!")
    }
    return {
        start: [...intervals].sort((a, b) => compareDesc(a.start, b.start))[0].start,
        end: [...intervals].sort((a, b) => compareAsc(a.end, b.end))[0].end
    }
}