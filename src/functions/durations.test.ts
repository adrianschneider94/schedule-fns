import {durationToMilliseconds, multiplyDuration} from "./durations"

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