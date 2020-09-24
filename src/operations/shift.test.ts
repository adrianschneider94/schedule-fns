import {ScheduleFromIntervals} from "../schedules"
import {shiftSchedule} from "./shift"
import {areIntervalsEqual} from "../functions/intervals"

test('Shift schedule', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10000}, {start: 20000, end: 30000})
    let shifted = shiftSchedule(schedule, {seconds: 1})

    let generator = shifted(5000)
    let entry = generator.next()
    expect(areIntervalsEqual(entry.value, {start: 5000, end: 11000})).toStrictEqual(true)

    entry = generator.next()
    expect(areIntervalsEqual(entry.value, {start: 21000, end: 31000})).toStrictEqual(true)
})

test('Shift schedule backward', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10000}, {start: 20000, end: 30000})
    let shifted = shiftSchedule(schedule, {seconds: 1})

    let generator = shifted(5000, "backward")
    let entry = generator.next()
    expect(areIntervalsEqual(entry.value, {start: 1000, end: 5000})).toStrictEqual(true)
})