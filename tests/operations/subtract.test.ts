import {ScheduleFromIntervals, subtractSchedules} from "schedule-fns"
import {areIntervalsEqual} from "schedule-fns/functions/intervals"

test('Subtract schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 10})
    let schedule2 = ScheduleFromIntervals({start: 2, end: 3}, {start: 4, end: 5})
    let subtractedSchedule = subtractSchedules(schedule1, schedule2)

    let generator = subtractedSchedule(0)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 2})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 3, end: 4})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 5, end: 10})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})