import {MAX_RECURSIONS, Schedule} from "../index"
import {isEmpty} from "../functions/misc"
import {compareAsc, isEqual} from "date-fns"
import {areIntervalsConnected, joinIntervals} from "../functions/intervals"

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