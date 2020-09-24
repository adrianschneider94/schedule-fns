import {Schedule} from "../index"
import {add} from "date-fns"
import {multiplyDuration} from "../functions/durations"

export function shiftSchedule(schedule: Schedule, duration: Duration): Schedule {
    return function* (startDate, direction) {
        let generator = schedule(add(startDate, multiplyDuration(duration, -1)), direction)
        for (let entry of generator) {
            yield {
                start: add(entry.start, duration),
                end: add(entry.end, duration)
            }
        }
    }
}