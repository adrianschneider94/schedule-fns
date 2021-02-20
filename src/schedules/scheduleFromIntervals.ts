import {Interval, Schedule} from "../index"
import {mergeIntervals} from "../functions/intervals"
import {directionToInt, isWithinInterval} from "../functions/misc"
import {createInterval, isEqualOrAfter, isEqualOrBefore} from "../functions/dateLibrary"

/**
 * Returns a schedule from the given intervals.
 *
 * @param intervals
 * @constructor
 * @category Schedules
 */
export function ScheduleFromIntervals(...intervals: Array<Interval>): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        if (directionInt === 1) {
            intervals = mergeIntervals(...intervals).filter(interval => isEqualOrAfter(interval.end, startDate))
        } else {
            intervals = mergeIntervals(...intervals).filter(interval => isEqualOrBefore(interval.start, startDate)).reverse()
        }

        for (const interval of intervals) {
            if (directionInt === 1 && isWithinInterval(startDate, interval)) {
                yield createInterval(startDate, interval.end)
            } else if (directionInt === -1 && isWithinInterval(startDate, interval)) {
                yield createInterval(interval.start, startDate)
            } else {
                yield interval
            }
        }
    }
}