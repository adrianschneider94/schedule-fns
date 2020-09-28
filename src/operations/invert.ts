import {isEqual} from "date-fns"


import {DateInfinity, Schedule} from "../index"
import {directionToInt} from "../functions/misc"

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
            yield {start: startDate, end: DateInfinity}
        } else if (last === undefined && directionInt === -1) {
            yield {start: -DateInfinity, end: startDate}
        } else if (directionInt === 1 && !isEqual(startDate, last.start)) {
            yield {start: startDate, end: last.start}
        } else if (directionInt === -1 && !isEqual(startDate, last.end)) {
            yield {start: last.end, end: startDate}
        }

        for (const interval of generator) {
            if (directionInt === 1) {
                yield {start: last.end, end: interval.start}
            } else {
                yield {start: interval.end, end: last.start}
            }
            last = interval
        }

        if (directionInt === 1 && last && !isEqual(last.end, DateInfinity)) {
            yield {start: last.end, end: DateInfinity}
        } else if (directionInt === -1 && last && !isEqual(last.end, -DateInfinity)) {
            yield {start: -DateInfinity, end: last.start}
        }
    }
}