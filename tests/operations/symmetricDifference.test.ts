import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("Symmetric difference of schedules", (lib) => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}
    let startDate = 0
    let e1 = {start: 0, end: 1}
    let e2 = {start: 2, end: 3}

    let schedule1 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i1))
    let schedule2 = lib.ScheduleFromIntervals(lib.intervalFromIntervalObject(i2))
    let schedule = lib.symmetricDifferenceOfSchedules(schedule1, schedule2)

    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})