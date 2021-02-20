import {intersectSchedules, Schedule, subtractSchedules} from "../index"
import {joinSchedules} from "./join"

/**
 * Returns the symmetric difference of two schedules (i.e. those parts of time, where exactly on schedule is on).
 *
 * Corresponds to the logical XOR operation.
 *
 * @param left
 * @param right
 * @category Operations
 */
export function symmetricDifferenceOfSchedules(left: Schedule, right: Schedule) {
    return subtractSchedules(joinSchedules(left, right), intersectSchedules(left, right))
}