import {
    areIntervalsConnected,
    areIntervalsEqual,
    areIntervalsIntersecting,
    intersectIntervals,
    joinIntervals,
    mergeIntervals
} from "./intervals"
import {DateInfinity} from "../index"

test('Two connected intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 20}
    expect(areIntervalsConnected(interval1, interval2)).toStrictEqual(true)
})

test('Two tangent intervals', () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 10, end: 20}
    expect(areIntervalsConnected(interval1, interval2)).toStrictEqual(true)
})

test('Two disjoint intervals', () => {
    let interval1 = {start: 0, end: 9}
    let interval2 = {start: 11, end: 20}
    expect(areIntervalsConnected(interval1, interval2)).toStrictEqual(false)
})

test('Three connected intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 21}
    let interval3 = {start: 19, end: 30}
    expect(areIntervalsConnected(interval1, interval2, interval3)).toStrictEqual(true)
})

test('Three partly disconnected intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let interval3 = {start: 21, end: 30}
    expect(areIntervalsConnected(interval1, interval2, interval3)).toStrictEqual(false)
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
    expect(areIntervalsEqual(interval1, interval2)).toStrictEqual(true)
})

test('Intervals are not equal', () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 0, end: 11}
    expect(areIntervalsEqual(interval1, interval2)).toStrictEqual(false)
})

test('Try to join no intervals', () => {
    expect(() => joinIntervals()).toThrowError()
})

test('Join two intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    expect(areIntervalsEqual(joinIntervals(interval1, interval2), {start: 0, end: 19})).toStrictEqual(true)
})

test('Join three intervals', () => {
    let interval1 = {start: 0, end: 11}
    let interval2 = {start: 9, end: 19}
    let interval3 = {start: 18, end: 30}
    expect(areIntervalsEqual(joinIntervals(interval1, interval2, interval3), {start: 0, end: 30})).toStrictEqual(true)
})

test('Try to join disjoint intervals', () => {
    let interval1 = {start: 0, end: 9}
    let interval2 = {start: 10, end: 20}
    expect(() => joinIntervals(interval1, interval2)).toThrowError()
})

test('Merge intervals', () => {
    let interval1 = {start: 0, end: 10}
    let interval2 = {start: 9, end: 20}
    let interval3 = {start: 21, end: 30}
    expect(mergeIntervals(interval1, interval2, interval3)).toStrictEqual([{start: 0, end: 20}, {start: 21, end: 30}])
})

test('Merge infinite intervals', () => {
    let interval1 = {start: -Infinity, end: 0}
    let interval2 = {start: 0, end: Infinity}
    expect(areIntervalsEqual(mergeIntervals(interval1, interval2)[0], {
        start: -DateInfinity,
        end: DateInfinity
    })).toStrictEqual(true)
})

test('Merge single interval', () => {
    expect(mergeIntervals({start: 0, end: 1})).toStrictEqual([{start: 0, end: 1}])
})

test('areIntervalsIntersecting: No interval is intersecting', () => {
    expect(areIntervalsIntersecting()).toBe(true)
})

test('areIntervalsIntersecting: Single interval is intersecting', () => {
    expect(areIntervalsIntersecting({start: 0, end: 1})).toBe(true)
})

test('areIntervalsIntersecting: Two intersecting intervals', () => {
    expect(areIntervalsIntersecting({start: 0, end: 2}, {start: 1, end: 3})).toBe(true)
    expect(areIntervalsIntersecting({start: 0, end: 1}, {start: 1, end: 2})).toBe(true)
})

test('areIntervalsIntersecting: Two disjoint intervals', () => {
    expect(areIntervalsIntersecting({start: 0, end: 1}, {start: 2, end: 3})).toBe(false)
})

test('areIntervalsIntersecting: Three intersecting intervals', () => {
    expect(areIntervalsIntersecting({start: 0, end: 2}, {start: 1, end: 3}, {start: 1, end: 4})).toBe(true)
})

test('areIntervalsIntersecting: Three connected but not intersecting intervals', () => {
    expect(areIntervalsIntersecting({start: 0, end: 2}, {start: 1, end: 4}, {start: 3, end: 5})).toBe(false)
})

test('intersectIntervals: Empty interval throws error', () => {
    expect(() => intersectIntervals()).toThrowError()
})

test('intersectIntervals: Single interval intersects to itself', () => {
    expect(areIntervalsEqual(intersectIntervals({start: 0, end: 1}), {start: 0, end: 1})).toBe(true)
})

test('intersectIntervals: Intersect two intervals', () => {
    expect(
        areIntervalsEqual(
            intersectIntervals({start: 0, end: 2}, {start: 1, end: 3}),
            {start: 1, end: 2}
        )
    ).toBe(true)
})

test('intersectIntervals: Intersecting disjoint intervals throws error', () => {
    expect(() => intersectIntervals({start: 0, end: 1}, {start: 2, end: 3})).toThrowError()
})

test('intersectIntervals: Intersect three intervals', () => {
    expect(
        areIntervalsEqual(
            intersectIntervals({start: 0, end: 3}, {start: 2, end: 5}, {start: 2.5, end: 4}),
            {start: 2.4, end: 3}
        )
    ).toBe(true)
})