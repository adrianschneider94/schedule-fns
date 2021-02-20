import {intervalFromIntervalObject, ScheduleFromIntervals, symmetricDifferenceOfSchedules} from "schedule-fns"
import {dateTimeFromDateOrNumber} from "schedule-fns/functions/dateLibrary"

test('Symmetric difference of schedules', () => {
    let i1 = {start: 0, end: 2}
    let i2 = {start: 1, end: 3}
    let startDate = 0
    let e1 = {start: 0, end: 1}
    let e2 = {start: 2, end: 3}

    let schedule1 = ScheduleFromIntervals(intervalFromIntervalObject(i1))
    let schedule2 = ScheduleFromIntervals(intervalFromIntervalObject(i2))
    let schedule = symmetricDifferenceOfSchedules(schedule1, schedule2)

    let generator = schedule(dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})