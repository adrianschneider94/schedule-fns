import {isArrayEmpty} from "../misc/misc"
import {DateTimeLibrary} from "./index"

/**
 * Determines if the given intervals are intersecting.
 *
 * If true, all given intervals intersect with each other.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function areIntervalsIntersecting<DT, I, D>(this: DateTimeLibrary<DT, I, D>, ...intervals: Array<I>): boolean {
    if (isArrayEmpty(intervals) || intervals.length === 1) {
        return true
    }
    return intervals.every(left => intervals.every(right => {
        try {
            this.intersectTwoIntervals(left, right)
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
export function areIntervalsConnected<DT, I, D>(this: DateTimeLibrary<DT, I, D>, ...intervals: Array<I>): boolean {
    if (isArrayEmpty(intervals)) {
        return true
    }
    return intervals.every((left, i) => intervals.some((right, j) => {
        if (i === j) {
            return false
        } else {
            try {
                this.intersectTwoIntervals(left, right)
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
export function areIntervalsEqual<DT, I, D>(this: DateTimeLibrary<DT, I, D>, ...intervals: Array<I>): boolean {
    if (isArrayEmpty(intervals)) {
        return true
    }
    return intervals.every(interval => (this.areTwoIntervalsEqual(interval, intervals[0])))
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
export function joinIntervals<DT, I, D>(this: DateTimeLibrary<DT, I, D>, ...intervals: Array<I>): I {
    if (isArrayEmpty(intervals)) {
        throw Error("Need to provide at least one interval to join.")
    }
    if (!this.areIntervalsConnected(...intervals)) {
        throw Error("Can't join intervals as they are disjoint!")
    }
    return intervals.reduce((aggregate, current) => this.joinTwoIntervals(aggregate, current))
}

/**
 * Returns a union (array of intervals) of disjoint intervals.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function mergeIntervals<DT, I, D>(this: DateTimeLibrary<DT, I, D>, ...intervals: Array<I>): Array<I> {
    if (isArrayEmpty(intervals)) {
        return []
    }

    function reducer(this: DateTimeLibrary<DT, I, D>, aggregate: Array<I>, currentValue: I): Array<I> {
        let lastInterval = aggregate.slice(-1)[0]
        if (this.areIntervalsConnected(lastInterval, currentValue)) {
            return [...aggregate.slice(0, -1), this.joinTwoIntervals(lastInterval, currentValue)]
        } else {
            return [...aggregate, currentValue]
        }
    }

    let boundReducer = reducer.bind(this)

    let sortedIntervals = [...intervals].sort((a, b) => this.compareAsc(this.getIntervalStart(a), this.getIntervalStart(b)))
    return sortedIntervals.slice(1).reduce(boundReducer, [sortedIntervals[0]])
}

/**
 * Returns the intersection of a set of intervals.
 *
 * @param intervals
 * @category Interval functions
 * @internal
 */
export function intersectIntervals<DT, I, D>(this: DateTimeLibrary<DT, I, D>, ...intervals: Array<I>): I {
    if (isArrayEmpty(intervals)) {
        throw Error("Please provide at least one interval!")
    }
    let result = intervals.reduce((aggregate, current) => this.intersectTwoIntervals(aggregate, current))
    if (this.isIntervalEmpty(result)) {
        throw Error("Reuslt is an empty interval!")
    }
    return result
}