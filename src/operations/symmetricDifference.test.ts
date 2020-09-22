import {ScheduleFromIntervals} from "../schedules"
import {areIntervalsEqual} from "../functions/intervals"
import {symmetricDifferenceOfSchedules} from "./symmetricDifference"

test('Symmetric difference of schedules', () => {
    let schedule1 = ScheduleFromIntervals({start: 0, end: 2})
    let schedule2 = ScheduleFromIntervals({start: 1, end: 3})
    let schedule = symmetricDifferenceOfSchedules(schedule1, schedule2)

    let generator = schedule(0)

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 0, end: 1})).toBe(true)

    value = generator.next()
    expect(value.done).toBe(false)
    expect(areIntervalsEqual(value.value, {start: 2, end: 3})).toBe(true)

    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})