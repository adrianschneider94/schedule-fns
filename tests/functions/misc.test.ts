import {directionToInt, isArrayEmpty, take} from "schedule.js/abstract/misc/misc"
import each from "jest-each"
import {implementation} from "../jest.setup"

test("Empty array", () => {
    expect(isArrayEmpty([])).toStrictEqual(true)
})

test("Not empty array", () => {
    expect(isArrayEmpty([1])).toStrictEqual(false)
})


each(implementation).test("isWithinSchedule 1", (lib) => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 30, end: 40}
    let i3 = {start: 60, end: 70}
    let date = new Date(50)

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2), lib.intervalFromIntervalObject(i3))
    expect(lib.isWithinSchedule(lib.dateTimeFromDateOrNumber(date), schedule)).toBe(false)
})


each(implementation).test("isWithinSchedule 2", (lib) => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 30, end: 40}
    let i3 = {start: 60, end: 70}
    let date = new Date(65)

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2), lib.intervalFromIntervalObject(i3))
    expect(lib.isWithinSchedule(lib.dateTimeFromDateOrNumber(date), schedule)).toBe(true)
})


each(implementation).test("isWithinSchedule 3", (lib) => {
    let startDate = 0
    let duration = {seconds: 1}
    let period = {seconds: 2}
    let date = 121500

    let schedule = lib.RegularSchedule(lib.dateTimeFromDateOrNumber(startDate), lib.durationFromDurationObject(duration), lib.durationFromDurationObject(period))
    expect(lib.isWithinSchedule(lib.dateTimeFromDateOrNumber(date), schedule)).toBe(false)
})

each(implementation).test("isWithinSchedule 4", (lib) => {
    let i1 = {start: 0, end: 10}
    let i2 = {start: 30, end: 40}
    let i3 = {start: 60, end: 70}
    let date = 80

    let schedule = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1), lib.intervalFromIntervalObject(i2), lib.intervalFromIntervalObject(i3))
    expect(lib.isWithinSchedule(lib.dateTimeFromDateOrNumber(date), schedule)).toBe(false)
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

