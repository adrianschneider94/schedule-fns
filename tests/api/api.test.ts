import {RegularSchedule as LuxonRegularSchedule} from "schedule.js/luxon"
import {RegularSchedule as DateFnsRegularSchedule} from "schedule.js/date-fns"
import {DateTime, Duration} from "luxon"
import {formatISO, parseISO} from "date-fns"


test("Luxon", () => {
    let schedule = LuxonRegularSchedule(DateTime.fromISO("2020-08-01T00:00:00Z"), Duration.fromISO("P5W"), Duration.fromISO("P1W"))
    let generator = schedule(DateTime.fromISO("2020-01-01T00:00:00Z"))

    let value = generator.next()
    expect(value.done).toBe(false)
    if (!value.done) {
        expect(value.value.toISO()).toBe("2020-08-01T02:00:00.000+02:00/2020-09-05T02:00:00.000+02:00")
    }
})

test("date-fns", () => {
    let schedule = DateFnsRegularSchedule(parseISO("2020-08-01T00:00:00Z"), {weeks: 5}, {weeks: 1})
    let generator = schedule(parseISO("2020-01-01T00:00:00Z"))

    let value = generator.next()
    expect(value.done).toBe(false)
    if (!value.done) {
        expect(formatISO(value.value.start) + "/" + formatISO(value.value.end)).toBe("2020-08-01T02:00:00+02:00/2020-09-05T02:00:00+02:00")
    }
})