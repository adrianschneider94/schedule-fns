import {Schedule} from "schedule.js"
import {ScheduleFnsLibrary} from "../library"

/**
 * Subtracts one schedule from another.
 *
 * @param left
 * @param right
 * @category Operations
 */
export type subtractSchedules<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, left: Schedule<DT, I, D>, right: Schedule<DT, I, D>) => Schedule<DT, I, D>

export const subtractSchedules: subtractSchedules<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, left: Schedule<DT, I, D>, right: Schedule<DT, I, D>): Schedule<DT, I, D> {
    return this.intersectSchedules(left, this.invertSchedule(right))
}