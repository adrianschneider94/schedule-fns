import {DateTimeImplementation} from "../index"
import {isArrayEmpty} from "./misc"
import {DateTime} from "luxon"

export type IntervalObject = {
    start: Date | number | DateTime
    end: Date | number | DateTime
}

export type IntervalAsISOStrings = {
    start: string
    end: string
}

export const areIntervalsIntersecting = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>
        function (...intervals: Array<I>): boolean {
            if (isArrayEmpty(intervals) || intervals.length === 1) {
                return true
            }
            return intervals.every(left => intervals.every(right => {
                try {
                    impl.intersectTwoIntervals(left, right)
                    return true
                } catch {
                    return false
                }
            }))
        }
)


export const areIntervalsConnected = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>
        function (...intervals: Array<I>): boolean {
            if (isArrayEmpty(intervals)) {
                return true
            }
            return intervals.every((left, i) => intervals.some((right, j) => {
                if (i === j) {
                    return false
                } else {
                    try {
                        impl.intersectTwoIntervals(left, right)
                        return true
                    } catch {
                        return false
                    }
                }
            }))
        }
)


export const areIntervalsEqual = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>
        function (...intervals: Array<I>): boolean {
            if (isArrayEmpty(intervals)) {
                return true
            }
            return intervals.every(interval => (impl.areTwoIntervalsEqual(interval, intervals[0])))
        }
)


export const joinIntervals = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) => function (...intervals: Array<I>): I {
        if (isArrayEmpty(intervals)) {
            throw Error("Need to provide at least one interval to join.")
        }
        if (!areIntervalsConnected(impl)(...intervals)) {
            throw Error("Can't join intervals as they are disjoint!")
        }
        return intervals.reduce((aggregate, current) => impl.joinTwoIntervals(aggregate, current))
    }
)


export const mergeIntervals = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (...intervals: Array<I>): Array<I> {
            if (isArrayEmpty(intervals)) {
                return []
            }

            function reducer(aggregate: Array<I>, currentValue: I): Array<I> {
                let lastInterval = aggregate.slice(-1)[0]
                if (areIntervalsConnected(impl)(lastInterval, currentValue)) {
                    return [...aggregate.slice(0, -1), impl.joinTwoIntervals(lastInterval, currentValue)]
                } else {
                    return [...aggregate, currentValue]
                }
            }

            let sortedIntervals = [...intervals].sort((a, b) => impl.compareAsc(impl.getStart(a), impl.getStart(b)))
            return sortedIntervals.slice(1).reduce(reducer, [sortedIntervals[0]])
        }
)


export const intersectIntervals = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (...intervals: Array<I>): I {
            if (isArrayEmpty(intervals)) {
                throw Error("Please provide at least one interval!")
            }
            let result = intervals.reduce((aggregate, current) => impl.intersectTwoIntervals(aggregate, current))
            if (impl.isIntervalEmpty(result)) {
                throw Error("Reuslt is an empty interval!")
            }
            return result
        }

)