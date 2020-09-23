import {addDuration, addDurations, durationToMilliseconds, multiplyDuration} from "./durations"
import {RegularSchedule, ScheduleFromIntervals} from "../schedules"

test('durationToMilliseconds: 1 year, 2 weeks, 3 months, 4 days, 5 hours, 6 minutes, 7 seconds', () => {
    expect(durationToMilliseconds({
        years: 1,
        months: 2,
        weeks: 3,
        days: 4,
        hours: 5,
        minutes: 6,
        seconds: 7
    })).toStrictEqual(38919319000)
})

test('multiplyDuration', () => {
    expect(multiplyDuration({
        years: 1,
        months: 2,
        weeks: 3,
        days: 4,
        hours: 5,
        minutes: 6,
        seconds: 7
    }, 2)).toStrictEqual({
        years: 2,
        months: 4,
        weeks: 6,
        days: 8,
        hours: 10,
        minutes: 12,
        seconds: 14
    })
})

test('addDurations', () => {
    expect(addDurations(
        {years: 1, months: 2, weeks: 3, days: 4, hours: 5, minutes: 6, seconds: 7},
        {years: 8, months: 7, weeks: 6, days: 5, hours: 4, minutes: 3, seconds: 2},
        {years: 1, months: 1, weeks: 1, days: 1, hours: 1, minutes: 1, seconds: 1}
    )).toStrictEqual(
        {years: 10, months: 10, weeks: 10, days: 10, hours: 10, minutes: 10, seconds: 10}
    )
})

test('addDuration 1', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 20, end: 30})
    let result = addDuration(0, {seconds: 0.015}, schedule)
    expect(result.valueOf()).toStrictEqual(25)
})

test('addDuration 2', () => {
    let schedule = ScheduleFromIntervals({start: 5, end: 10}, {start: 20, end: 30})
    let result = addDuration(0, {seconds: 0.015}, schedule)
    expect(result.valueOf()).toStrictEqual(30)
})

test('addDuration 3', () => {
    let schedule = ScheduleFromIntervals({start: 5, end: 10}, {start: 20, end: 30})
    expect(() => addDuration(0, {seconds: 0.030}, schedule)).toThrowError()
})

test('addDuration 4', () => {
    let schedule = RegularSchedule(new Date(), {seconds: 1}, {seconds: 2})
    expect(() => addDuration(0, {years: 1}, schedule)).toThrowError()
})

