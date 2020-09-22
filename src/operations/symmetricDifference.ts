import {intersectSchedules, Schedule, subtractSchedules} from "../index"
import {joinSchedules} from "./join"

export function symmetricDifferenceOfSchedules(scheduleLeft: Schedule, scheduleRight: Schedule) {
    return subtractSchedules(joinSchedules(scheduleLeft, scheduleRight), intersectSchedules(scheduleLeft, scheduleRight))
}