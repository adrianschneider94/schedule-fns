import {intervalFromIntervalObject, ScheduleFromIntervals, subtractSchedules} from "schedule-fns"
import {dateTimeFromDateOrNumber} from "schedule-fns/functions/dateLibrary"

test('Subtract schedules', () => {
    let i1 = {start: 0, end: 10}
    let i2_1 = {start: 2, end: 3}
    let i2_2 = {start: 4, end: 5}
    let startDate = 0
    let e1 = {start: 0, end: 2}
    let e2 = {start: 3, end: 4}
    let e3 = {start: 5, end: 10}

    let schedule1 = ScheduleFromIntervals(intervalFromIntervalObject(i1))
    let schedule2 = ScheduleFromIntervals(intervalFromIntervalObject(i2_1), intervalFromIntervalObject(i2_2))
    let subtractedSchedule = subtractSchedules(schedule1, schedule2)

    let generator = subtractedSchedule(dateTimeFromDateOrNumber(startDate))

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e2))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(intervalFromIntervalObject(e3))

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})