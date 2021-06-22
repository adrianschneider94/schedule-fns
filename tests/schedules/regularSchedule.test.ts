import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("RegularSchedule", (lib) => {
    let sD = 0
    let d = {seconds: 1}
    let p = {seconds: 2}

    let startDate = 0
    let schedule = lib.RegularSchedule(lib.dateTimeFromDateOrNumber(sD), lib.durationFromDurationObject(d), lib.durationFromDurationObject(p))
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 0, end: 1000}
    let e2 = {start: 2000, end: 3000}
    let e3 = {start: 4000, end: 5000}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e3))
})

each(implementation).test("RegularSchedule with offset start 1", (lib) => {
    let sD = 0
    let d = {seconds: 1}
    let p = {seconds: 2}
    let startDate = 5500

    let schedule = lib.RegularSchedule(lib.dateTimeFromDateOrNumber(sD), lib.durationFromDurationObject(d), lib.durationFromDurationObject(p))
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 6000, end: 7000}
    let e2 = {start: 8000, end: 9000}


    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))
})

each(implementation).test("RegularSchedule with offset start 2", (lib) => {
    let sD = 0
    let d = {seconds: 1}
    let p = {seconds: 2}
    let startDate = 500

    let schedule = lib.RegularSchedule(lib.dateTimeFromDateOrNumber(sD), lib.durationFromDurationObject(d), lib.durationFromDurationObject(p))
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate))

    let e1 = {start: 500, end: 1000}
    let e2 = {start: 2000, end: 3000}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))
})


each(implementation).test("RegularSchedule backward", (lib) => {
    let sD = 0
    let d = {seconds: 1}
    let p = {seconds: 2}
    let schedule = lib.RegularSchedule(lib.dateTimeFromDateOrNumber(sD), lib.durationFromDurationObject(d), lib.durationFromDurationObject(p))
    let startDate = 2500
    let generator = schedule(lib.dateTimeFromDateOrNumber(startDate), "backward")

    let e1 = {start: 2000, end: 2500}
    let e2 = {start: 0, end: 1000}
    let e3 = {start: -2000, end: -1000}

    let value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e2))

    value = generator.next()
    expect(value.done).toBe(false)
    expect(value.value).toBeSameIntervalAs(lib.intervalFromIntervalObject(e3))

})


