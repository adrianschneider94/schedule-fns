import {ScheduleFnsLibrary} from "../implementations"
import {Schedule} from "schedule.js"

/**
 * Shifts a schedule by a duration.
 *
 * @param schedule
 * @param duration
 * @category Operations
 */
export function shiftSchedule<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, schedule: Schedule<DT, I, D>, duration: D): Schedule<DT, I, D> {
    let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction) {
        let generator = schedule(this.addDuration(startDate, this.multiplyDuration(duration, -1)), direction)
        for (let entry of generator) {
            yield this.createInterval(this.addDuration(this.getIntervalStart(entry), duration), this.addDuration(this.getIntervalEnd(entry), duration))
        }
    }
    return generator.bind(this)
}