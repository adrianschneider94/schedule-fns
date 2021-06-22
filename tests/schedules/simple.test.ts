import each from "jest-each"
import {implementation} from "../jest.setup"

each(implementation).test("From", (lib) => {
    let startDate = 300000
    let schedule = lib.From(lib.dateTimeFromDateOrNumber(startDate))

    let start = 400000
    let e1 = {start: start, end: Infinity}
    let e2 = {start: startDate, end: start}

    let generator = schedule(lib.dateTimeFromDateOrNumber(start))
    let next = generator.next().value
    expect(next).toBeSameIntervalAs(lib.intervalFromIntervalObject(e1))
})

each(implementation).test("From (backwards)", (lib) => {
    let startDate = 300000
    let schedule = lib.From(lib.dateTimeFromDateOrNumber(startDate))

    let start = 400000
    let expected = {start: startDate, end: start}

    let generator = schedule(lib.dateTimeFromDateOrNumber(start), "backward")
    expect(generator.next().value).toBeSameIntervalAs(lib.intervalFromIntervalObject(expected))
})

each(implementation).test("Until", (lib) => {
    let endDate = 400000
    let schedule = lib.Until(lib.dateTimeFromDateOrNumber(endDate))

    let start = 300000
    let expected = {start: start, end: endDate}

    let generator = schedule(lib.dateTimeFromDateOrNumber(start))
    expect(generator.next().value).toBeSameIntervalAs(lib.intervalFromIntervalObject(expected))
})

each(implementation).test("Until (backwards)", (lib) => {
    let endDate = 400000
    let schedule = lib.Until(lib.dateTimeFromDateOrNumber(endDate))

    let start = 300000
    let expected = {start: -Infinity, end: start}

    let generator = schedule(lib.dateTimeFromDateOrNumber(start), "backward")
    expect(generator.next().value).toBeSameIntervalAs(lib.intervalFromIntervalObject(expected))
})