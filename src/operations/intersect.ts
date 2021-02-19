import {MAX_RECURSIONS, Schedule} from "../index"
import {compareAsc, compareDesc, directionToInt, isEmpty, isEqual} from "../functions/misc"
import {intersectIntervals} from "../functions/intervals"

/**
 * Intersects schedules.
 *
 * @param schedules
 * @category Operations
 */
export function intersectSchedules(...schedules: Array<Schedule>): Schedule {
    return function* (startDate, direction = "forward") {
        if (isEmpty(schedules)) {
            return
        }

        let directionInt = directionToInt(direction)

        let generators = schedules.map(schedule => schedule(startDate, direction))
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
                    if ((directionInt === 1 && entry.value.end <= intersection.end) || (directionInt === -1 && entry.value.start >= intersection.start)) {
                        return generators[i].next()
                    } else {
                        return entry
                    }
                })
            } catch (e) {
                let i: number
                if (directionInt === 1) {
                    let firstEnd = [...currentEntries].sort((a, b) => compareAsc(a.value.end, b.value.end))[0].value.end
                    i = currentEntries.findIndex(x => isEqual(x.value.end, firstEnd))
                } else {
                    let lastStart = [...currentEntries].sort((a, b) => compareDesc(a.value.start, b.value.start))[0].value.start
                    i = currentEntries.findIndex(x => isEqual(x.value.start, lastStart))
                }
                currentEntries[i] = generators[i].next()
            }
            recursions++
        }
        throw Error("Maximal number of recursions reached.")
    }
}