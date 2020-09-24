import {Schedule} from "../index"
import {isWithinInterval} from "date-fns"
import {mergeIntervals} from "../functions/intervals"
import {directionToInt} from "../functions/misc"

export function ScheduleFromIntervals(...intervals: Array<Interval>): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        if (directionInt === 1) {
            intervals = mergeIntervals(...intervals).filter(interval => interval.end >= startDate)
        } else {
            intervals = mergeIntervals(...intervals).filter(interval => interval.start <= startDate).reverse()
        }

        for (const interval of intervals) {
            if (directionInt === 1 && isWithinInterval(startDate, interval)) {
                yield {start: startDate, end: interval.end}
            } else if (directionInt === -1 && isWithinInterval(startDate, interval)) {
                yield {start: interval.start, end: startDate}
            } else {
                yield interval
            }
        }
    }
}