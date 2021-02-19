import {InfintyDateTime, NegInfinityDateTime, Schedule} from "../index"
import {createInterval, directionToInt, isEqual} from "../functions/misc"

/**
 * Inverts a schedule
 *
 * @param schedule
 * @category Operations
 */
export function invertSchedule(schedule: Schedule): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        let generator = schedule(startDate, direction)
        let last = generator.next().value

        if (last === undefined && directionInt === 1) {
            yield createInterval(startDate, InfintyDateTime)
        } else if (last === undefined && directionInt === -1) {
            yield createInterval(NegInfinityDateTime, startDate)
        } else if (directionInt === 1 && !isEqual(startDate, last.start)) {
            yield createInterval(startDate, last.start)
        } else if (directionInt === -1 && !isEqual(startDate, last.end)) {
            yield createInterval(last.end, startDate)
        }

        for (const interval of generator) {
            if (directionInt === 1) {
                yield createInterval(last.end, interval.start)
            } else {
                yield createInterval(interval.end, last.start)
            }
            last = interval
        }

        if (directionInt === 1 && last && !isEqual(last.end, InfintyDateTime)) {
            yield createInterval(last.end, InfintyDateTime)
        } else if (directionInt === -1 && last && !isEqual(last.end, NegInfinityDateTime)) {
            yield createInterval(NegInfinityDateTime, last.start)
        }
    }
}