import {
    catchInfiniteDate,
    catchInfiniteInterval,
    directionToInt,
    getUserTimeZone,
    isEmpty,
    isoFormatTime,
    isWithinSchedule,
    stripTime
} from "./misc"
import {isEqual, parseISO} from "date-fns"
import {DateInfinity, RegularSchedule, ScheduleFromIntervals} from "../index"

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

test('isWithinSchedule 1', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 30, end: 40}, {start: 60, end: 70})
    let date = new Date(50)
    expect(isWithinSchedule(date, schedule)).toBeFalsy()
})


test('isWithinSchedule 2', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 30, end: 40}, {start: 60, end: 70})
    let date = new Date(65)
    expect(isWithinSchedule(date, schedule)).toBeTruthy()
})


test('isWithinSchedule 3', () => {
    let schedule = RegularSchedule(new Date(0), {seconds: 1}, {seconds: 2})
    let date = new Date(121500)
    expect(isWithinSchedule(date, schedule)).toBeFalsy()
})


test('directionToInt', () => {
    expect(directionToInt("forward")).toStrictEqual(1)
    expect(directionToInt(1)).toStrictEqual(1)
    expect(directionToInt("backward")).toStrictEqual(-1)
    expect(directionToInt(-1)).toStrictEqual(-1)
    // @ts-ignore
    expect(() => directionToInt("Test")).toThrowError()
})

test('stripTime', () => {
    expect(isEqual(stripTime(parseISO("2020-10-01T18:23Z")), parseISO("2020-10-01T00:00Z"))).toStrictEqual(true)
})

test('getUserTimeZone', () => {
    expect(getUserTimeZone().length).toBeGreaterThan(0)
})

test('isoFormatTime', () => {
    expect(isoFormatTime("08:00", "HH:mm")).toStrictEqual("08:00:00.000")
    expect(isoFormatTime("1:35 PM", "h:m a")).toStrictEqual("13:35:00.000")
})
