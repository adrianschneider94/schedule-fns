import {intersectSchedules, invertSchedule, Schedule} from "../index"

/**
 * Subtracts one schedule from another.
 *
 * @param left
 * @param right
 * @category Operations
 */
export function subtractSchedules(left: Schedule, right: Schedule): Schedule {
    return intersectSchedules(left, invertSchedule(right))
}