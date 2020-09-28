import {intersectSchedules, invertSchedule, Schedule} from "../index"

/**
 * Subtracts one schedule from another.
 *
 * @param scheduleLeft
 * @param scheduleRight
 * @category Operations
 */
export function subtractSchedules(scheduleLeft: Schedule, scheduleRight: Schedule): Schedule {
    return intersectSchedules(scheduleLeft, invertSchedule(scheduleRight))
}