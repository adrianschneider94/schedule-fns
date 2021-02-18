import {Interval} from "../index"
import {createInterval, isEmpty} from "./misc"

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
    if (!areIntervalsIntersecting(...intervals)) {
        throw Error("Can't intersect the given intervals!")
    }
    let sortedIntervals = [...intervals].sort((a, b) => a.start > b.start ? 1 : -1)
    let start = sortedIntervals[0].start
    let end = sortedIntervals.slice(-1)[0].end

    if (start.equals(end)) {
        throw Error("Result is not a valid interval as it is just a point in time.")
    }

    return createInterval(start, end)
}