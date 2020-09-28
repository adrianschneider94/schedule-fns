import {intersectSchedules, Schedule, subtractSchedules} from "../index"
import {joinSchedules} from "./join"

/**
 * Returns the symmetric difference of two schedules (i.e. those parts of time, where exactly on schedule is on).
 *
 * Corresponds to the logical XOR operation.
 *
 * @param scheduleLeft
 * @param scheduleRight
 * @category Operations
 */
export function symmetricDifferenceOfSchedules(scheduleLeft: Schedule, scheduleRight: Schedule) {
    return subtractSchedules(joinSchedules(scheduleLeft, scheduleRight), intersectSchedules(scheduleLeft, scheduleRight))
}