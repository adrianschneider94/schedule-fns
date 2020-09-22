import {MAX_RECURSIONS, Schedule} from "../index"
import {isEmpty} from "../functions/misc"
import {intersectIntervals} from "../functions/intervals"
import {compareAsc, isEqual} from "date-fns"

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