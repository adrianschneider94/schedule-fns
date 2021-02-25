import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {

} from "schedule.js/functions/intervals"
import {Creators, implementation} from "../jest.setup"
import {DateTimeImplementation, Exports} from "schedule.js"

describe.each(implementation)('durations', <DT, I, D>(x: any) => {
    type T = {
        datetime: DT,
        interval: I,
        duration: D
    }
    let impl = x.impl

    let {
        roughDurationToMilliseconds,
        multiplyDuration,
        durationSum,
    } = x.impl as DateTimeImplementation<T>

    let {
        addDurationWithinSchedule,
        ScheduleFromIntervals,
        RegularSchedule
    } = x.fns as Exports<T>

    let {
        createDuration,
        createInterval,
        createDateTime
    } = x.creators as Creators<T>

    test("Two connected intervals", () => {
        let interval1 = {start: 0, end: 11}
        let interval2 = {start: 9, end: 20}
        expect(areIntervalsConnected(createInterval(interval1), createInterval(interval2))).toStrictEqual(true)
    })

    test("Two tangent intervals", () => {
        let interval1 = {start: 0, end: 10}
        let interval2 = {start: 10, end: 20}
        expect(areIntervalsConnected(createInterval(interval1), createInterval(interval2))).toStrictEqual(true)
    })

    test("Two disjoint intervals", () => {
        let interval1 = {start: 0, end: 9}
        let interval2 = {start: 11, end: 20}
        expect(areIntervalsConnected(createInterval(interval1), createInterval(interval2))).toStrictEqual(false)
    })

    test("Three connected intervals", () => {
        let interval1 = {start: 0, end: 11}
        let interval2 = {start: 9, end: 21}
        let interval3 = {start: 19, end: 30}
        expect(areIntervalsConnected(createInterval(interval1), createInterval(interval2), createInterval(interval3))).toStrictEqual(true)
    })

    test("Three partly disconnected intervals", () => {
        let interval1 = {start: 0, end: 11}
        let interval2 = {start: 9, end: 19}
        let interval3 = {start: 21, end: 30}
        expect(areIntervalsConnected(createInterval(interval1), createInterval(interval2), createInterval(interval3))).toStrictEqual(false)
    })

    test("No intervals are always connected", () => {
        expect(areIntervalsConnected()).toStrictEqual(true)
    })

    test("No intervals are always equal", () => {
        expect(areIntervalsEqual()).toStrictEqual(true)
    })

    test("Intervals are equal", () => {
        let interval1 = {start: 0, end: 10}
        let interval2 = {start: 0, end: 10}
        expect(areIntervalsEqual(createInterval(interval1), createInterval(interval2))).toStrictEqual(true)
    })

    test("Intervals are not equal", () => {
        let interval1 = {start: 0, end: 10}
        let interval2 = {start: 0, end: 11}
        expect(areIntervalsEqual(createInterval(interval1), createInterval(interval2))).toStrictEqual(false)
    })

    test("Try to join no intervals", () => {
        expect(() => joinIntervals()).toThrowError()
    })

    test("Join two intervals", () => {
        let interval1 = {start: 0, end: 11}
        let interval2 = {start: 9, end: 19}
        let expected = {start: 0, end: 19}
        expect(joinIntervals(createInterval(interval1), createInterval(interval2))).toBeSameIntervalAs(createInterval(expected))
    })

    test("Join three intervals", () => {
        let interval1 = {start: 0, end: 11}
        let interval2 = {start: 9, end: 19}
        let interval3 = {start: 18, end: 30}
        let expected = {start: 0, end: 30}
        expect(joinIntervals(createInterval(interval1), createInterval(interval2), createInterval(interval3))).toBeSameIntervalAs(createInterval(expected))
    })

    test("Try to join disjoint intervals", () => {
        let interval1 = {start: 0, end: 9}
        let interval2 = {start: 10, end: 20}
        expect(() => joinIntervals(createInterval(interval1), createInterval(interval2))).toThrowError()
    })

    test("Merge intervals", () => {
        let interval1 = {start: 0, end: 10}
        let interval2 = {start: 9, end: 20}
        let interval3 = {start: 21, end: 30}
        let expected = [{start: 0, end: 20}, {start: 21, end: 30}]

        expect(mergeIntervals(createInterval(interval1), createInterval(interval2), createInterval(interval3))).toStrictEqual([createInterval(expected[0]), createInterval(expected[1])])
    })

    test("Merge infinite intervals", () => {
        let interval1 = {start: -Infinity, end: 0}
        let interval2 = {start: 0, end: Infinity}
        let expected = {
            start: -Infinity,
            end: Infinity
        }

        expect(mergeIntervals(createInterval(interval1), createInterval(interval2))[0]).toBeSameIntervalAs(createInterval(expected))
    })

    test("Merge single interval", () => {
        let interval = {start: 0, end: 1}
        expect(mergeIntervals(createInterval(interval))).toStrictEqual([createInterval(interval)])
    })

    test("areIntervalsIntersecting: No interval is intersecting", () => {
        expect(areIntervalsIntersecting()).toBe(true)
    })

    test("areIntervalsIntersecting: Single interval is intersecting", () => {
        let interval = {start: 0, end: 1}
        expect(areIntervalsIntersecting(createInterval(interval))).toBe(true)
    })

    test("areIntervalsIntersecting: Two intersecting intervals", () => {
        let interval1 = {start: 0, end: 2}
        let interval2 = {start: 1, end: 3}
        expect(areIntervalsIntersecting(createInterval(interval1), createInterval(interval2))).toBe(true)

        let interval3 = {start: 0, end: 1}
        let interval4 = {start: 1, end: 2}
        expect(areIntervalsIntersecting(createInterval(interval3), createInterval(interval4))).toBe(true)
    })

    test("areIntervalsIntersecting: Two disjoint intervals", () => {
        let i1 = {start: 0, end: 1}
        let i2 = {start: 2, end: 3}
        expect(areIntervalsIntersecting(createInterval(i1), createInterval(i2))).toBe(false)
    })

    test("areIntervalsIntersecting: Three intersecting intervals", () => {
        let i1 = {start: 0, end: 2}
        let i2 = {start: 1, end: 3}
        let i3 = {start: 1, end: 4}
        expect(areIntervalsIntersecting(createInterval(i1), createInterval(i2), createInterval(i3))).toBe(true)
    })

    test("areIntervalsIntersecting: Three connected but not intersecting intervals", () => {
        let i1 = {start: 0, end: 2}
        let i2 = {start: 1, end: 4}
        let i3 = {start: 3, end: 5}
        expect(areIntervalsIntersecting(createInterval(i1), createInterval(i2), createInterval(i3))).toBe(false)
    })

    test("intersectIntervals: Empty interval throws error", () => {
        expect(() => intersectIntervals()).toThrowError()
    })

    test("intersectIntervals: Single interval intersects to itself", () => {
        let i = {start: 0, end: 1}
        let e = {start: 0, end: 1}
        expect(intersectIntervals(createInterval(i))).toBeSameIntervalAs(createInterval(e))
    })

    test("intersectIntervals: Intersect two intervals", () => {
        let i1 = {start: 0, end: 2}
        let i2 = {start: 1, end: 3}
        let e = {start: 1, end: 2}
        expect(intersectIntervals(createInterval(i1), createInterval(i2))).toBeSameIntervalAs(createInterval(e))
    })

    test("intersectIntervals: Intersect two tangent intervals", () => {
        let i1 = {start: 0, end: 2}
        let i2 = {start: 2, end: 4}

        expect(() => intersectIntervals(createInterval(i1), createInterval(i2))).toThrow()
    })

    test("intersectIntervals: Intersecting disjoint intervals throws error", () => {
        let i1 = {start: 0, end: 1}
        let i2 = {start: 2, end: 3}
        expect(() => intersectIntervals(createInterval(i1), createInterval(i2))).toThrowError()
    })

    test("intersectIntervals: Intersect three intervals", () => {
        let i1 = {start: 0, end: 3}
        let i2 = {start: 2, end: 5}
        let i3 = {start: 2.5, end: 4}
        let e = {start: 2.4, end: 3}
        expect(intersectIntervals(createInterval(i1), createInterval(i2), createInterval(i3))).toBeSameIntervalAs(createInterval(e))
    })

})