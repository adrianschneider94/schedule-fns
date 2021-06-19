import {MAX_RECURSIONS, Schedule} from "schedule.js"
import {directionToInt, isArrayEmpty} from "../misc/misc"
import {ScheduleFnsLibrary} from "../library"

export type intersectSchedules<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, ...schedules: Array<Schedule<DT, I, D>>) => Schedule<DT, I, D>

/**
 * Intersects schedules.
 *
 * @param schedules
 * @category Operations
 */
export const intersectSchedules: intersectSchedules<any, any, any> =
    function intersectSchedules<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, ...schedules: Array<Schedule<DT, I, D>>): Schedule<DT, I, D> {
        let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = "forward") {
            if (isArrayEmpty(schedules)) {
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
                    let intersection = this.intersectIntervals(...currentEntries.map(x => x.value))
                    yield intersection
                    recursions = 0
                    currentEntries = currentEntries.map((entry, i) => {
                        if ((directionInt === 1 && this.isEqualOrBefore(entry.value.end, intersection.end)) || (directionInt === -1 && this.isEqualOrAfter(entry.value.start, intersection.start))) {
                            return generators[i].next()
                        } else {
                            return entry
                        }
                    })
                } catch (e) {
                    let i: number
                    if (directionInt === 1) {
                        let firstEnd = [...currentEntries].sort((a, b) => this.compareAsc(a.value.end, b.value.end))[0].value.end
                        i = currentEntries.findIndex(x => this.isEqual(x.value.end, firstEnd))
                    } else {
                        let lastStart = [...currentEntries].sort((a, b) => this.compareDesc(a.value.start, b.value.start))[0].value.start
                        i = currentEntries.findIndex(x => this.isEqual(x.value.start, lastStart))
                    }
                    currentEntries[i] = generators[i].next()
                }
                recursions++
            }
            throw Error("Maximal number of recursions reached.")
        }
        return generator.bind(this)
    }
