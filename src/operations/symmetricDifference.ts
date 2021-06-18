import {Schedule} from "../index"
import {ScheduleFnsLibrary} from "../implementations"

/**
 * Returns the symmetric difference of two schedules (i.e. those parts of time, where exactly on schedule is on).
 *
 * Corresponds to the logical XOR operation.
 *
 * @param left
 * @param right
 * @category Operations
 */
export function symmetricDifferenceOfSchedules<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, left: Schedule<DT, I, D>, right: Schedule<DT, I, D>) {
    return this.subtractSchedules(this.joinSchedules(left, right), this.intersectSchedules(left, right))
}