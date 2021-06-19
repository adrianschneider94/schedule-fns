import {RegularSchedule} from "schedule.js/luxon"
import {DateTime, Duration} from "luxon"


test("RegularSchedule", () => {
    let schedule = RegularSchedule(DateTime.fromISO("2020-08-01T00:00:00Z"), Duration.fromISO("P5W"), Duration.fromISO("P1W"))
    let generator = schedule(DateTime.fromISO("2020-01-01T00:00:00Z"))

    let value = generator.next()
    expect(value.done).toBe(false)
    if (!value.done) {
        console.log(value.value.toISO())
    }

    value = generator.next()
    expect(value.done).toBe(false)
    if (!value.done) {
        console.log(value.value.toISO())
    }

    value = generator.next()
    expect(value.done).toBe(false)
    if (!value.done) {
        console.log(value.value.toISO())
    }
})