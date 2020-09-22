import {catchInfiniteDate, catchInfiniteInterval, isEmpty} from "./misc"
import {isEqual} from "date-fns"
import {DateInfinity} from "../index"

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

