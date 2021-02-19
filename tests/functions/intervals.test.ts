import {
    areIntervalsConnected,
    areIntervalsEqual,
    areIntervalsIntersecting,
    intersectIntervals,
    intervalFromIntervalObject,
    joinIntervals,
    mergeIntervals
} from "schedule-fns/functions/intervals"

test('Two connected intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 20}
    expect(areIntervalsConnected(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toStrictEqual(true)
})

test('Two tangent intervals', () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 10, end: 20}
    expect(areIntervalsConnected(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toStrictEqual(true)
})

test('Two disjoint intervals', () => {
    let interval1 = {start: 0, end: 9}
    let interval2 = {start: 11, end: 20}
    expect(areIntervalsConnected(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toStrictEqual(false)
})

test('Three connected intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 21}
    let interval3 = {start: 19, end: 30}
    expect(areIntervalsConnected(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2), intervalFromIntervalObject(interval3))).toStrictEqual(true)
})

test('Three partly disconnected intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let interval3 = {start: 21, end: 30}
    expect(areIntervalsConnected(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2), intervalFromIntervalObject(interval3))).toStrictEqual(false)
})

test('No intervals are always connected', () => {
    expect(areIntervalsConnected()).toStrictEqual(true)
})

test('No intervals are always equal', () => {
    expect(areIntervalsEqual()).toStrictEqual(true)
})

test('Intervals are equal', () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 0, end: 10}
    expect(areIntervalsEqual(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toStrictEqual(true)
})

test('Intervals are not equal', () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 0, end: 11}
    expect(areIntervalsEqual(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toStrictEqual(false)
})

test('Try to join no intervals', () => {
    expect(() => joinIntervals()).toThrowError()
})

test('Join two intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let expected = {start: 0, end: 19}
    expect(joinIntervals(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toBeSameIntervalAs(intervalFromIntervalObject(expected))
})

test('Join three intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let interval3 = {start: 18, end: 30}
    let expected = {start: 0, end: 30}
    expect(joinIntervals(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2), intervalFromIntervalObject(interval3))).toBeSameIntervalAs(intervalFromIntervalObject(expected))
})

test('Try to join disjoint intervals', () => {
    let interval1 = {start: 0, end: 9}
    let interval2 = {start: 10, end: 20}
    expect(() => joinIntervals(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toThrowError()
})

test('Merge intervals', () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 9, end: 20}
    let interval3 = {start: 21, end: 30}
    let expected = [{start: 0, end: 20}, {start: 21, end: 30}]

    expect(mergeIntervals(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2), intervalFromIntervalObject(interval3))).toStrictEqual([intervalFromIntervalObject(expected[0]), intervalFromIntervalObject(expected[1])])
})

test('Merge infinite intervals', () => {
    let interval1 = {start: -Infinity, end: 0}
    let interval2 = {start: 0, end: Infinity}
    let expected = {
        start: -Infinity,
        end: Infinity
    }

    expect(mergeIntervals(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))[0]).toBeSameIntervalAs(intervalFromIntervalObject(expected))
})

test('Merge single interval', () => {
    let interval = {start: 0, end: 1}
    expect(mergeIntervals(intervalFromIntervalObject(interval))).toStrictEqual([intervalFromIntervalObject(interval)])
})

test('areIntervalsIntersecting: No interval is intersecting', () => {
    expect(areIntervalsIntersecting()).toBe(true)
})

test('areIntervalsIntersecting: Single interval is intersecting', () => {
    let interval = {start: 0, end: 1}
    expect(areIntervalsIntersecting(intervalFromIntervalObject(interval))).toBe(true)
})

test('areIntervalsIntersecting: Two intersecting intervals', () => {
    let interval1 = {start: 0, end: 2}
    let interval2 = {start: 1, end: 3}
    expect(areIntervalsIntersecting(intervalFromIntervalObject(interval1), intervalFromIntervalObject(interval2))).toBe(true)

    let interval3 = {start: 0, end: 1}
    let interval4 = {start: 1, end: 2}
    expect(areIntervalsIntersecting(intervalFromIntervalObject(interval3), intervalFromIntervalObject(interval4))).toBe(true)
})

test('areIntervalsIntersecting: Two disjoint intervals', () => {
    let i1 = {start: 0, end: 1}
    let i2 = {start: 2, end: 3}
    expect(areIntervalsIntersecting(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2))).toBe(false)
})

test('areIntervalsIntersecting: Three intersecting intervals', () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}
    let i3 = {start: 1, end: 4}
    expect(areIntervalsIntersecting(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2), intervalFromIntervalObject(i3))).toBe(true)
})

test('areIntervalsIntersecting: Three connected but not intersecting intervals', () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 4}
    let i3 = {start: 3, end: 5}
    expect(areIntervalsIntersecting(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2), intervalFromIntervalObject(i3))).toBe(false)
})

test('intersectIntervals: Empty interval throws error', () => {
    expect(() => intersectIntervals()).toThrowError()
})

test('intersectIntervals: Single interval intersects to itself', () => {
    let i = {start: 0, end: 1}
    let e = {start: 0, end: 1}
    expect(intersectIntervals(intervalFromIntervalObject(i))).toBeSameIntervalAs(intervalFromIntervalObject(e))
})

test('intersectIntervals: Intersect two intervals', () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}
    let e = {start: 1, end: 2}
    expect(intersectIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2))).toBeSameIntervalAs(intervalFromIntervalObject(e))
})

test('intersectIntervals: Intersect two tangent intervals', () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 2, end: 4}
    let e = {start: 2, end: 2}
    expect(intersectIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2))).toBeSameIntervalAs(intervalFromIntervalObject(e))
})

test('intersectIntervals: Intersecting disjoint intervals throws error', () => {
    let i1 = {start: 0, end: 1}
    let i2 = {start: 2, end: 3}
    expect(() => intersectIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2))).toThrowError()
})

test('intersectIntervals: Intersect three intervals', () => {
    let i1 = {start: 0, end: 3}
    let i2 = {start: 2, end: 5}
    let i3 = {start: 2.5, end: 4}
    let e = {start: 2.4, end: 3}
    expect(intersectIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2), intervalFromIntervalObject(i3))).toBeSameIntervalAs(intervalFromIntervalObject(e))
})