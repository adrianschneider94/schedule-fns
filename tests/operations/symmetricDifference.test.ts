import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {ScheduleFromIntervals} from "schedule.js/schedules"
import {symmetricDifferenceOfSchedules} from "schedule.js/operations"

test("Symmetric difference of schedules", () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}
    let startDate = 0
    let e1 = {start: 0, end: 1}
    let e2 = {start: 2, end: 3}

    let schedule1 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i1))
    let schedule2 = ScheduleFromIntervals(LuxonImplementation)(LuxonImplementation.intervalFromIntervalObject(i2))
    let schedule = symmetricDifferenceOfSchedules(LuxonImplementation)(schedule1, schedule2)

    let generator = schedule(LuxonImplementation.dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(LuxonImplementation.intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})