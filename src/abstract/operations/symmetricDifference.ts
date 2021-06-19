import {Schedule} from "schedule.js"
import {ScheduleFnsLibrary} from "../library"

/**
 * Returns the symmetric difference of two schedules (i.e. those parts of time, where exactly on schedule is on).
 *
 * Corresponds to the logical XOR operation.
 *
 * @param left
 * @param right
 * @category Operations
 */
export type symmetricDifferenceOfSchedules<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, left: Schedule<DT, I, D>, right: Schedule<DT, I, D>) => Schedule<DT, I, D>

export const symmetricDifferenceOfSchedules: symmetricDifferenceOfSchedules<any, any, any> =
    function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, left: Schedule<DT, I, D>, right: Schedule<DT, I, D>) {
        return this.subtractSchedules(this.joinSchedules(left, right), this.intersectSchedules(left, right))
    }