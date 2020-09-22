import {intersectSchedules, invertSchedule, Schedule} from "../index"

export function subtractSchedules(scheduleLeft: Schedule, scheduleRight: Schedule): Schedule {
    return intersectSchedules(scheduleLeft, invertSchedule(scheduleRight))
}