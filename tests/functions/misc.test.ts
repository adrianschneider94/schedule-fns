import {
    durationFromDurationObject,
    intervalFromIntervalObject,
    RegularSchedule,
    ScheduleFromIntervals,
    take
} from "schedule-fns"
import {directionToInt, isArrayEmpty, isWithinSchedule} from "schedule-fns/functions/misc"
import {dateTimeFromDateOrNumber} from "schedule-fns/functions/dateLibrary"

test("Empty array", () => {
    expect(isArrayEmpty([])).toStrictEqual(true)
})

test("Not empty array", () => {
    expect(isArrayEmpty([1])).toStrictEqual(false)
})


test("isWithinSchedule 1", () => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 30, end: 40}
    let i3 = {start: 60, end: 70}
    let date = new Date(50)

    let schedule = ScheduleFromIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2), intervalFromIntervalObject(i3))
    expect(isWithinSchedule(dateTimeFromDateOrNumber(date), schedule)).toBe(false)
})


test("isWithinSchedule 2", () => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 30, end: 40}
    let i3 = {start: 60, end: 70}
    let date = new Date(65)

    let schedule = ScheduleFromIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2), intervalFromIntervalObject(i3))
    expect(isWithinSchedule(dateTimeFromDateOrNumber(date), schedule)).toBe(true)
})


test("isWithinSchedule 3", () => {
    let startDate = 0
    let duration = {seconds: 1}
    let period = {seconds: 2}
    let date = 121500

    let schedule = RegularSchedule(dateTimeFromDateOrNumber(startDate), durationFromDurationObject(duration), durationFromDurationObject(period))
    expect(isWithinSchedule(dateTimeFromDateOrNumber(date), schedule)).toBe(false)
})

test("isWithinSchedule 4", () => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 30, end: 40}
    let i3 = {start: 60, end: 70}
    let date = 80

    let schedule = ScheduleFromIntervals(intervalFromIntervalObject(i1), intervalFromIntervalObject(i2), intervalFromIntervalObject(i3))
    expect(isWithinSchedule(dateTimeFromDateOrNumber(date), schedule)).toBe(false)
})

test("directionToInt", () => {
    expect(directionToInt("forward")).toStrictEqual(1)
    expect(directionToInt(1)).toStrictEqual(1)
    expect(directionToInt("backward")).toStrictEqual(-1)
    expect(directionToInt(-1)).toStrictEqual(-1)
    // @ts-ignore
    expect(() => directionToInt("Test")).toThrowError()
})


test("take", () => {
    let generator = function* () {
        yield 1
        yield 2
        yield 3
        yield 4
        yield 5
    }
    let result = [...take(generator(), 3)]
    expect(result).toStrictEqual([1, 2, 3])
})

test("take 0", () => {
    let generator = function* () {
        yield 1
        yield 2
        yield 3
        yield 4
        yield 5
    }
    let result = [...take(generator(), 0)]
    expect(result).toStrictEqual([])
})

test("take -5", () => {
    let generator = function* () {
        yield 1
        yield 2
        yield 3
        yield 4
        yield 5
    }
    let result = [...take(generator(), -5)]
    expect(result).toStrictEqual([])
})

