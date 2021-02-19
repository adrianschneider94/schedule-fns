import {InfintyDateTime, Interval, MAX_RECURSIONS, NegInfinityDateTime, Schedule} from "../index"
import {directionToInt, isEmpty, isEqual} from "../functions/misc"
import {areIntervalsConnected, joinIntervals} from "../functions/intervals"

/**
 * Get the interval that starts first of a given set of intervals.
 *
 * @param intervals
 * @internal
 */
function getFirstInterval(intervals: Array<Interval>) {
    return [...intervals].filter(x => x !== undefined).sort((a, b) => a.start > b.start ? 1 : -1)[0]
}

/**
 * Gets the interval that ends last of a given set of intervals.
 *
 * @param intervals
 * @internal
 */
function getLastInterval(intervals: Array<Interval>) {
    return [...intervals].filter(x => x !== undefined).sort((a, b) => a.end < b.end ? 1 : -1)[0]
}

/**
 * Joins a set of schedules.
 *
 * @param schedules
 * @category Operations
 */
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
                if (currentEntries.every(x => x.done) || (directionInt === 1 && isEqual(currentInterval.end, InfintyDateTime)) || (directionInt === -1 && isEqual(currentInterval.start, NegInfinityDateTime))) {
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