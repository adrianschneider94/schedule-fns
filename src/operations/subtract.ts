import {Schedule} from "schedule.js"
import {ScheduleFnsLibrary} from "../implementations"

/**
 * Subtracts one schedule from another.
 *
 * @param left
 * @param right
 * @category Operations
 */
export function subtractSchedules<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, left: Schedule<DT, I, D>, right: Schedule<DT, I, D>): Schedule<DT, I, D> {
    return this.intersectSchedules(left, this.invertSchedule(right))
}