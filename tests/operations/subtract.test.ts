import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("Subtract schedules", (lib) => {
    let i1 = {start: 0, end: 10}
    let i2_1 = {start: 2, end: 3}
    let i2_2 = {start: 4, end: 5}
    let startDate = 0
    let e1 = {start: 0, end: 2}
    let e2 = {start: 3, end: 4}
    let e3 = {start: 5, end: 10}

    let schedule1 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1))
    let schedule2 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i2_1), lib.intervalFromIntervalObject(i2_2))
    let subtractedSchedule = lib.subtractSchedules(schedule1, schedule2)

    let generator = subtractedSchedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e3))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})