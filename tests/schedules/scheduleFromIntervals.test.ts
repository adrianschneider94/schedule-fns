import {ScheduleFromIntervals} from "schedule-fns"

test('Basic schedule from intervals', () => {
    let intervals = [{start: 0, end: 10}, {start: 20, end: 30}]
    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(0)
    expect(generator.next()).toStrictEqual({value: {start: 0, end: 10}, done: false})
    expect(generator.next()).toStrictEqual({value: {start: 20, end: 30}, done: false})
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from empty list of intervals', () => {
    let schedule = ScheduleFromIntervals()
    let generator = schedule(0)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from intervals with startDate in interval', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 20, end: 30})
    let generator = schedule(25)
    expect(generator.next()).toStrictEqual({value: {start: 25, end: 30}, done: false})
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Schedule from intervals with startDate after all intervals', () => {
    let schedule = ScheduleFromIntervals({start: 0, end: 10}, {start: 20, end: 30})
    let generator = schedule(35)
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Basic schedule from intervals, reverse direction', () => {
    let intervals = [{start: 0, end: 10}, {start: 20, end: 30}]
    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(50, "backward")
    expect(generator.next()).toStrictEqual({value: {start: 20, end: 30}, done: false})
    expect(generator.next()).toStrictEqual({value: {start: 0, end: 10}, done: false})
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})

test('Basic schedule from intervals, reverse direction, startDate in interval', () => {
    let intervals = [{start: 0, end: 10}, {start: 20, end: 30}]
    let schedule = ScheduleFromIntervals(...intervals)
    let generator = schedule(25, "backward")
    expect(generator.next()).toStrictEqual({value: {start: 20, end: 25}, done: false})
    expect(generator.next()).toStrictEqual({value: {start: 0, end: 10}, done: false})
    expect(generator.next()).toStrictEqual({value: undefined, done: true})
})