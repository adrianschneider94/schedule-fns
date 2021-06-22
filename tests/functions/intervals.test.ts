import each from "jest-each"
import {implementation} from "../jest.setup"
import {areIntervalsOverlapping} from "date-fns"
import {DateFnsScheduleFns as dateFns} from "schedule.js"

each(implementation).test("Two connected intervals", (lib) => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 20}
    expect(lib.areIntervalsConnected(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toStrictEqual(true)
})

each(implementation).test("Two tangent intervals", (lib) => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 10, end: 20}
    expect(lib.areIntervalsConnected(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toStrictEqual(true)
})

each(implementation).test("Two disjoint intervals", (lib) => {
    let interval1 = {start: 0, end: 9}
    let interval2 = {start: 11, end: 20}
    expect(lib.areIntervalsConnected(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toStrictEqual(false)
})

each(implementation).test("Three connected intervals", (lib) => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 21}
    let interval3 = {start: 19, end: 30}
    expect(lib.areIntervalsConnected(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2), lib.intervalFromIntervalObject(interval3))).toStrictEqual(true)
})

each(implementation).test("Three partly disconnected intervals", (lib) => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let interval3 = {start: 21, end: 30}
    expect(lib.areIntervalsConnected(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2), lib.intervalFromIntervalObject(interval3))).toStrictEqual(false)
})

each(implementation).test("No intervals are always connected", (lib) => {
    expect(lib.areIntervalsConnected()).toStrictEqual(true)
})

each(implementation).test("No intervals are always equal", (lib) => {
    expect(lib.areIntervalsEqual()).toStrictEqual(true)
})

each(implementation).test("Intervals are equal", (lib) => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 0, end: 10}
    expect(lib.areIntervalsEqual(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toStrictEqual(true)
})

each(implementation).test("Intervals are not equal", (lib) => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 0, end: 11}
    expect(lib.areIntervalsEqual(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toStrictEqual(false)
})

each(implementation).test("Try to join no intervals", (lib) => {
    expect(() => lib.joinIntervals()).toThrowError()
})

each(implementation).test("Join two intervals", (lib) => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let expected = {start: 0, end: 19}
    expect(lib.joinIntervals(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toBeSameIntervalAs(lib.intervalFromIntervalObject(expected))
})

each(implementation).test("Join three intervals", (lib) => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let interval3 = {start: 18, end: 30}
    let expected = {start: 0, end: 30}
    expect(lib.joinIntervals(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2), lib.intervalFromIntervalObject(interval3))).toBeSameIntervalAs(lib.intervalFromIntervalObject(expected))
})

each(implementation).test("Try to join disjoint intervals", (lib) => {
    let interval1 = {start: 0, end: 9}
    let interval2 = {start: 10, end: 20}
    expect(() => lib.joinIntervals(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toThrowError()
})

each(implementation).test("Merge intervals", (lib) => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 9, end: 20}
    let interval3 = {start: 21, end: 30}
    let expected = [{start: 0, end: 20}, {start: 21, end: 30}]

    expect(lib.mergeIntervals(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2), lib.intervalFromIntervalObject(interval3))).toStrictEqual([lib.intervalFromIntervalObject(expected[0]), lib.intervalFromIntervalObject(expected[1])])
})

test("Overlapping infinite intervals in date-fns", () => {
    let interval1 = {start: -Infinity, end: 0}
    let interval2 = {start: 0, end: Infinity}
    let result = areIntervalsOverlapping(dateFns.intervalFromIntervalObject(interval1), dateFns.intervalFromIntervalObject(interval2), {inclusive: true})
    expect(result).toBe(true)
})

each(implementation).test("Merge infinite intervals", (lib) => {
    let interval1 = {start: -Infinity, end: 0}
    let interval2 = {start: 0, end: Infinity}
    let expected = {
        start: -Infinity,
        end: Infinity
    }
    let int1 = lib.intervalFromIntervalObject(interval1)
    let int2 = lib.intervalFromIntervalObject(interval2)
    let mergedInterval = lib.mergeIntervals(int1, int2)[0]
    expect(mergedInterval).toBeSameIntervalAs(lib.intervalFromIntervalObject(expected))
})

each(implementation).test("Merge single interval", (lib) => {
    let interval = {start: 0, end: 1}
    expect(lib.mergeIntervals(lib.intervalFromIntervalObject(interval))).toStrictEqual([lib.intervalFromIntervalObject(interval)])
})

each(implementation).test("areIntervalsIntersecting: No interval is intersecting", (lib) => {
    expect(lib.areIntervalsIntersecting()).toBe(true)
})

each(implementation).test("areIntervalsIntersecting: Single interval is intersecting", (lib) => {
    let interval = {start: 0, end: 1}
    expect(lib.areIntervalsIntersecting(lib.intervalFromIntervalObject(interval))).toBe(true)
})

each(implementation).test("areIntervalsIntersecting: Two intersecting intervals", (lib) => {
    let interval1 = {start: 0, end: 2}
    let interval2 = {start: 1, end: 3}
    expect(lib.areIntervalsIntersecting(lib.intervalFromIntervalObject(interval1), lib.intervalFromIntervalObject(interval2))).toBe(true)

    let interval3 = {start: 0, end: 1}
    let interval4 = {start: 1, end: 2}
    expect(lib.areIntervalsIntersecting(lib.intervalFromIntervalObject(interval3), lib.intervalFromIntervalObject(interval4))).toBe(true)
})

each(implementation).test("areIntervalsIntersecting: Two disjoint intervals", (lib) => {
    let i1 = {start: 0, end: 1}
    let i2 = {start: 2, end: 3}
    expect(lib.areIntervalsIntersecting(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))).toBe(false)
})

each(implementation).test("areIntervalsIntersecting: Three intersecting intervals", (lib) => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}
    let i3 = {start: 1, end: 4}
    expect(lib.areIntervalsIntersecting(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2), lib.intervalFromIntervalObject(i3))).toBe(true)
})

each(implementation).test("areIntervalsIntersecting: Three connected but not intersecting intervals", (lib) => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 4}
    let i3 = {start: 3, end: 5}
    expect(lib.areIntervalsIntersecting(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2), lib.intervalFromIntervalObject(i3))).toBe(false)
})

each(implementation).test("intersectIntervals: Empty interval throws error", (lib) => {
    expect(() => lib.intersectIntervals()).toThrowError()
})

each(implementation).test("intersectIntervals: Single interval intersects to itself", (lib) => {
    let i = {start: 0, end: 1}
    let e = {start: 0, end: 1}
    expect(lib.intersectIntervals(lib.intervalFromIntervalObject(i))).toBeSameIntervalAs(lib.intervalFromIntervalObject(e))
})

each(implementation).test("intersectIntervals: Intersect two intervals", (lib) => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}
    let e = {start: 1, end: 2}
    expect(lib.intersectIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))).toBeSameIntervalAs(lib.intervalFromIntervalObject(e))
})

each(implementation).test("intersectIntervals: Intersect two tangent intervals", (lib) => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 2, end: 4}

    expect(() => lib.intersectIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))).toThrow()
})

each(implementation).test("intersectIntervals: Intersecting disjoint intervals throws error", (lib) => {
    let i1 = {start: 0, end: 1}
    let i2 = {start: 2, end: 3}
    expect(() => lib.intersectIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2))).toThrowError()
})

each(implementation).test("intersectIntervals: Intersect three intervals", (lib) => {
    let i1 = {start: 0, end: 30}
    let i2 = {start: 20, end: 50}
    let i3 = {start: 25, end: 40}
    let e = {start: 25, end: 30}
    expect(lib.intersectIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2), lib.intervalFromIntervalObject(i3))).toBeSameIntervalAs(lib.intervalFromIntervalObject(e))
})