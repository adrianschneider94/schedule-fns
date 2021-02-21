import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {ScheduleFromIntervals} from "schedule.js/schedules"
import {subtractSchedules} from "schedule.js/operations"

test("Subtract schedules", () => {
    let i1 = {start: 0, end: 10}
    let i2_1 = {start: 2, end: 3}
    let i2_2 = {start: 4, end: 5}
    let startDate = 0
    let e1 = {start: 0, end: 2}
    let e2 = {start: 3, end: 4}
    let e3 = {start: 5, end: 10}

    let schedule1 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1))
    let schedule2 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i2_1), LuxonImplementation.intervalFromIntervalObject(i2_2))
    let subtractedSchedule = subtractSchedules(LuxonImplementation)(schedule1, schedule2)

    let generator = subtractedSchedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e3))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})