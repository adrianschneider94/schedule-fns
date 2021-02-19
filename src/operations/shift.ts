import {Duration, Schedule} from "../index"
import {multiplyDuration} from "../functions/durations"
import {addDuration, createInterval} from "../functions/misc"

/**
 * Shifts a schedule by a duration.
 *
 * @param schedule
 * @param duration
 * @category Operations
 */
export function shiftSchedule(schedule: Schedule, duration: Duration): Schedule {
    return function* (startDate, direction) {
        let generator = schedule(addDuration(startDate, multiplyDuration(duration, -1)), direction)
        for (let entry of generator) {
            yield createInterval(addDuration(entry.start, duration), addDuration(entry.end, duration))
        }
    }
}