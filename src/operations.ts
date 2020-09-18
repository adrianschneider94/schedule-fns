import {DateInfinity, MAX_RECURSIONS, Schedule} from "./index"
import {compareAsc, isEqual} from "date-fns"
import {areIntervalsConnected, intersectIntervals, isEmpty, joinIntervals} from "./functions"

export function invertSchedule(schedule: Schedule): Schedule {
    return function* (startDate) {
        let generator = schedule(startDate)
        let last = generator.next().value
        if (last === undefined) {
            yield {start: startDate, end: DateInfinity}
        } else if (!isEqual(startDate, last.start)) {
            yield {start: startDate, end: last.start}
        }
        for (const interval of generator) {
            yield {start: last.end, end: interval.start}
            last = interval
        }
        if (last && !isEqual(last.end, DateInfinity)) {
            yield {start: last.end, end: DateInfinity}
        }
    }
}

export function joinSchedules(...schedules: Array<Schedule>): Schedule {
    return function* (startDate) {
        if (isEmpty(schedules)) {
            return
        }

        let generators = schedules.map(schedule => schedule(startDate))
        let currentEntries = generators.map(generator => generator.next())
        let currentInterval: Interval = [...currentEntries].filter(x => x?.value !== undefined).sort((a, b) => compareAsc(a.value.start, b.value.start))[0].value
        let recursions = 0

        while (recursions <= MAX_RECURSIONS) {
            let updated = false
            for (const [i, entry] of currentEntries.entries()) {
                if (entry?.value && areIntervalsConnected(currentInterval, entry.value)) {
                    currentInterval = joinIntervals(currentInterval, entry.value)
                    currentEntries[i] = generators[i].next()
                    updated = true
                }
            }
            if (!updated) {
                yield currentInterval
                recursions = 0
                if (currentEntries.every(x => x.done) || isEqual(currentInterval.end, Infinity)) {
                    return
                }
                currentInterval = [...currentEntries].filter(x => x?.value !== undefined).sort((a, b) => compareAsc(a.value.start, b.value.start))[0].value
            }
            recursions++
        }
        throw Error("Maximal number of recursions reached.")
    }
}

export function intersectSchedules(...schedules: Array<Schedule>): Schedule {
    return function* (startDate) {
        if (isEmpty(schedules)) {
            return
        }

        let generators = schedules.map(schedule => schedule(startDate))
        let currentEntries = generators.map(generator => generator.next())
        let recursions = 0
        while (recursions <= MAX_RECURSIONS) {
            if (currentEntries.some(entry => entry?.value === undefined)) {
                return
            }
            try {
                let intersection = intersectIntervals(...currentEntries.map(x => x.value))
                yield intersection
                recursions = 0
                currentEntries = currentEntries.map((entry, i) => {
                    if (entry.value.end <= intersection.end) {
                        return generators[i].next()
                    } else {
                        return entry
                    }
                })
            } catch (e) {
                let firstEnd = [...currentEntries].sort((a, b) => compareAsc(a.value.end, b.value.end))[0].value.end
                let i = currentEntries.findIndex(x => isEqual(x.value.end, firstEnd))
                currentEntries[i] = generators[i].next()
            }
            recursions++
        }
        throw Error("Maximal number of recursions reached.")
    }
}

export function subtractSchedules(scheduleLeft: Schedule, scheduleRight: Schedule): Schedule {
    return intersectSchedules(scheduleLeft, invertSchedule(scheduleRight))
}

export function symmetricDifferenceOfSchedules(scheduleLeft: Schedule, scheduleRight: Schedule) {
    return subtractSchedules(joinSchedules(scheduleLeft, scheduleRight), intersectSchedules(scheduleLeft, scheduleRight))
}