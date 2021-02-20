import {DateTime, Interval} from "../index"
import {isArrayEmpty} from "./misc"
import {areTwoIntervalsEqual, compareAsc, intersectTwoIntervals, isIntervalEmpty, joinTwoIntervals} from "./dateLibrary"

export type IntervalObject = {
    start: Date | number | DateTime
    end: Date | number | DateTime
}

export type IntervalAsISOStrings = {
    start: string
    end: string
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
    if (isArrayEmpty(intervals) || intervals.length === 1) {
        return true
    }
    return intervals.every(left => intervals.every(right => {
        try {
            intersectTwoIntervals(left, right)
            return true
        } catch {
            return false
        }
    }))
}

/**
 * Determines if the union of all intervals forms a single interval.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function areIntervalsConnected(...intervals: Array<Interval>): boolean {
    if (isArrayEmpty(intervals)) {
        return true
    }
    return intervals.every((left, i) => intervals.some((right, j) => {
        if (i === j) {
            return false
        } else {
            try {
                intersectTwoIntervals(left, right)
                return true
            } catch {
                return false
            }
        }
    }))
}

/**
 * Determines if all given intervals are equal.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function areIntervalsEqual(...intervals: Array<Interval>): boolean {
    if (isArrayEmpty(intervals)) {
        return true
    }
    return intervals.every(interval => (areTwoIntervalsEqual(interval, intervals[0])))
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
    if (isArrayEmpty(intervals)) {
        throw Error("Need to provide at least one interval to join.")
    }
    if (!areIntervalsConnected(...intervals)) {
        throw Error("Can't join intervals as they are disjoint!")
    }
    return intervals.reduce((aggregate, current) => joinTwoIntervals(aggregate, current))
}

/**
 * Returns a union (array of intervals) of disjoint intervals.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function mergeIntervals(...intervals: Array<Interval>): Array<Interval> {
    if (isArrayEmpty(intervals)) {
        return []
    }

    function reducer(aggregate: Array<Interval>, currentValue: Interval): Array<Interval> {
        let lastInterval = aggregate.slice(-1)[0]
        if (areIntervalsConnected(lastInterval, currentValue)) {
            return [...aggregate.slice(0, -1), joinTwoIntervals(lastInterval, currentValue)]
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
    if (isArrayEmpty(intervals)) {
        throw Error("Please provide at least one interval!")
    }
    let result = intervals.reduce((aggregate, current) => intersectTwoIntervals(aggregate, current))
    if (isIntervalEmpty(result)) {
        throw Error("Reuslt is an empty interval!")
    }
    return result
}