import {MAX_RECURSIONS, Schedule} from "schedule.js"
import {DateTimeLibrary} from "../dateTimeLibrary"

/**
 * Adds a duration to a given moment according to a schedule.
 *
 *
 * @param date The moment, the duration should be calculated from.
 * @param duration The duration that is added
 * @param schedule The schedule, that defines which time counts into the calculation.
 * @category Helper functions
 */
export type addDurationWithinSchedule<DT, I, D> = (this: DateTimeLibrary<DT, I, D>, date: DT, duration: D, schedule: Schedule<DT, I, D>) => DT

export const addDurationWithinSchedule: addDurationWithinSchedule<any, any, any> =
    function <DT, I, D>(this: DateTimeLibrary<DT, I, D>, date: DT, duration: D, schedule: Schedule<DT, I, D>): DT {
        let millisecondsLeft = this.durationToMilliseconds(duration)
        let generator = schedule(date)
        let i = 0
        while (i <= MAX_RECURSIONS) {
            i++
            let block = generator.next() as IteratorYieldResult<I>
            if (block.value === undefined) {
                throw Error("Duration does not fit into the given schedule!")
            } else {
                let next = this.addDuration(this.getIntervalStart(block.value), this.durationFromDurationObject({milliseconds: millisecondsLeft}))
                if (this.intervalContains(block.value, next) || this.isEqual(this.getIntervalEnd(block.value), next)) {
                    return next
                } else {
                    millisecondsLeft -= this.intervalToMilliseconds(block.value)
                }
            }
        }
        throw Error("Maximal number of recursions reached.")
    }