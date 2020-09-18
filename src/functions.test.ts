import {
    areIntervalsConnected,
    areIntervalsEqual,
    catchInfiniteDate,
    catchInfiniteInterval,
    isEmpty,
    joinIntervals,
    mergeIntervals
} from "./functions"
import {isEqual} from "date-fns"
import {DateInfinity} from "./index"

test('Empty array', () => {
    expect(isEmpty([])).toStrictEqual(true)
})

test('Not empty array', () => {
    expect(isEmpty([1])).toStrictEqual(false)
})

test('Positive infinite date', () => {
    expect(isEqual(catchInfiniteDate(Infinity), DateInfinity)).toStrictEqual(true)
})

test('Negative infinite date', () => {
    expect(isEqual(catchInfiniteDate(-Infinity), -DateInfinity)).toStrictEqual(true)
})

test('Finite date', () => {
    expect(38914).toBe(38914)
})

test('Catch Infinite interval', () => {
    let dirtyInterval = {start: -Infinity, end: Infinity}
    let cleanInterval = catchInfiniteInterval(dirtyInterval)
    expect(isEqual(cleanInterval.start, -DateInfinity)).toStrictEqual(true)
    expect(isEqual(cleanInterval.end, DateInfinity)).toStrictEqual(true)
})

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
    expect(mergeIntervals([interval1, interval2, interval3])).toStrictEqual([{start: 0, end: 20}, {start: 21, end: 30}])
})

test('Merge infinite intervals', () => {
    let interval1 = {start: -Infinity, end: 0}
    let interval2 = {start: 0, end: Infinity}
    expect(areIntervalsEqual(mergeIntervals([interval1, interval2])[0], {
        start: -DateInfinity,
        end: DateInfinity
    })).toStrictEqual(true)
})

test('Merge single interval', () => {
    expect(mergeIntervals([{start: 0, end: 1}])).toStrictEqual([{start: 0, end: 1}])
})