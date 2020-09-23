import {MAX_RECURSIONS, Schedule} from "../index"
import {directionToInt, isEmpty} from "../functions/misc"
import {compareAsc, compareDesc, isEqual} from "date-fns"
import {areIntervalsConnected, joinIntervals} from "../functions/intervals"

function getFirstInterval(intervals: Array<Interval>) {
    return [...intervals].filter(x => x !== undefined).sort((a, b) => compareAsc(a.start, b.start))[0]
}

function getLastInterval(intervals: Array<Interval>) {
    return [...intervals].filter(x => x !== undefined).sort((a, b) => compareDesc(a.end, b.end))[0]
}

export function joinSchedules(...schedules: Array<Schedule>): Schedule {
    return function* (startDate, direction = "forward") {
        if (isEmpty(schedules)) {
            return
        }

        let directionInt = directionToInt(direction)

        let generators = schedules.map(schedule => schedule(startDate, direction))
        let currentEntries = generators.map(generator => generator.next())
        let currentInterval: Interval

        if (directionInt === 1) {
            currentInterval = getFirstInterval([...currentEntries].map(x => x?.value))
        } else {
            currentInterval = getLastInterval([...currentEntries].map(x => x?.value))
        }
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
                if (currentEntries.every(x => x.done) || (directionInt === 1 && isEqual(currentInterval.end, Infinity)) || (directionInt === -1 && isEqual(currentInterval.start, -Infinity))) {
                    return
                }
                if (directionInt === 1) {
                    currentInterval = getFirstInterval([...currentEntries].map(x => x?.value))
                } else {
                    currentInterval = getLastInterval([...currentEntries].map(x => x?.value))
                }
            }
            recursions++
        }
        throw Error("Maximal number of recursions reached.")
    }
}