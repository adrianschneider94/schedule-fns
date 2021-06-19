import {MAX_RECURSIONS, Schedule} from "schedule.js"
import {directionToInt, isArrayEmpty} from "../misc/misc"
import {ScheduleFnsLibrary} from "../library"

/**
 * Get the interval that starts first of a given set of intervals.
 *
 * @param intervals
 * @internal
 */
export type getFirstInterval<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, intervals: Array<I>) => I

export function getFirstInterval<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, intervals: Array<I>): I {
    return [...intervals].filter(x => x !== undefined).sort((a, b) => this.compareAsc(this.getIntervalStart(a), this.getIntervalEnd(b)))[0]
}

/**
 * Gets the interval that ends last of a given set of intervals.
 *
 * @param intervals
 * @internal
 */
export function getLastInterval<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, intervals: Array<I>): I {
    return [...intervals].filter(x => x !== undefined).sort((a, b) => this.compareDesc(this.getIntervalEnd(a), this.getIntervalEnd(b)))[0]
}

/**
 * Joins a set of schedules.
 *
 * @param schedules
 * @category Operations
 */
export type joinSchedules<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, ...schedules: Array<Schedule<DT, I, D>>) => Schedule<DT, I, D>
export const joinSchedules: joinSchedules<any, any, any> =
    function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, ...schedules: Array<Schedule<DT, I, D>>): Schedule<DT, I, D> {
        let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = "forward") {
            if (isArrayEmpty(schedules)) {
                return
            }

            let directionInt = directionToInt(direction)

            let generators = schedules.map(schedule => schedule(startDate, direction))
            let currentEntries = generators.map(generator => generator.next())
            let currentInterval: I

            if (directionInt === 1) {
                currentInterval = this.getFirstInterval([...currentEntries].map(x => x?.value))
            } else {
                currentInterval = this.getLastInterval([...currentEntries].map(x => x?.value))
            }
            let recursions = 0

            while (recursions <= MAX_RECURSIONS) {
                let updated = false
                for (const [i, entry] of currentEntries.entries()) {
                    if (entry?.value && this.areIntervalsConnected(currentInterval, entry.value)) {
                        currentInterval = this.joinIntervals(currentInterval, entry.value)
                        currentEntries[i] = generators[i].next()
                        updated = true
                    }
                }
                if (!updated) {
                    yield currentInterval
                    recursions = 0
                    if (currentEntries.every(x => x.done) || (directionInt === 1 && this.isEqual(this.getIntervalEnd(currentInterval), this.infinityDateTime)) || (directionInt === -1 && this.isEqual(this.getIntervalStart(currentInterval), this.negativeInfinityDateTime))) {
                        return
                    }
                    if (directionInt === 1) {
                        currentInterval = this.getFirstInterval([...currentEntries].map(x => x?.value))
                    } else {
                        currentInterval = this.getLastInterval([...currentEntries].map(x => x?.value))
                    }
                }
                recursions++
            }
            throw Error("Maximal number of recursions reached.")
        }
        return generator.bind(this)
    }