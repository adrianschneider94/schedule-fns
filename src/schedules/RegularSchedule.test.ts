import {RegularSchedule} from "./RegularSchedule"
import {areIntervalsEqual} from "../functions/intervals"

test('RegularSchedule', () => {
    let schedule = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let generator = schedule(0)

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 0, end: 1000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 2000, end: 3000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 4000, end: 5000})).toBeTruthy()
})

test('RegularSchedule with offset start 1', () => {
    let schedule = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let generator = schedule(5500)

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 6000, end: 7000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 8000, end: 9000})).toBeTruthy()
})

test('RegularSchedule with offset start 2', () => {
    let schedule = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let generator = schedule(500)

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 500, end: 1000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 2000, end: 3000})).toBeTruthy()
})


test('RegularSchedule backward', () => {
    let schedule = RegularSchedule(0, {seconds: 1}, {seconds: 2})
    let generator = schedule(2500, "backward")

    let value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 2000, end: 2500})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: 0, end: 1000})).toBeTruthy()

    value = generator.next()
    expect(value.done).toBeFalsy()
    expect(areIntervalsEqual(value.value, {start: -2000, end: -1000})).toBeTruthy()

})


