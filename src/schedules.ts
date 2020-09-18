import {Schedule} from "./index"
import {mergeIntervals} from "./functions"
import {isWithinInterval} from "date-fns"

export function ScheduleFromIntervals(intervals: Array<Interval>): Schedule {
    return function* (startDate) {
        intervals = mergeIntervals(intervals).filter(interval => interval.end >= startDate)
        if (intervals.length === 0) {
            return
        }
        for (const [i, interval] of intervals.entries()) {
            if (i === 0 && isWithinInterval(startDate, interval)) {
                yield {start: startDate, end: interval.end}
            } else {
                yield interval
            }
        }
    }
}