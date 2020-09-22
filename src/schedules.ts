import {Schedule} from "./index"
import {durationToMilliseconds, mergeIntervals, multiplyDuration} from "./functions"
import {add, differenceInMilliseconds, isWithinInterval} from "date-fns"

export function ScheduleFromIntervals(...intervals: Array<Interval>): Schedule {
    return function* (startDate) {
        intervals = mergeIntervals(...intervals).filter(interval => interval.end >= startDate)
        for (const interval of intervals) {
            if (isWithinInterval(startDate, interval)) {
                yield {start: startDate, end: interval.end}
            } else {
                yield interval
            }
        }
    }
}

export function RegularSchedule(firstOccurrence: Date | number, duration: Duration, period: Duration): Schedule {
    return function* (startDate) {
        if (firstOccurrence <= startDate) {
            let fullPeriodsBeforeStartDate = Math.floor(differenceInMilliseconds(startDate, firstOccurrence) / durationToMilliseconds(period))
            firstOccurrence = add(firstOccurrence, multiplyDuration(period, fullPeriodsBeforeStartDate))
            if (add(firstOccurrence, duration) <= startDate) {
                firstOccurrence = add(firstOccurrence, period)
            }
        }
        let i = 0
        while (true) {
            let start = add(firstOccurrence, multiplyDuration(period, i))
            let interval = {
                start: start,
                end: add(start, duration)
            }
            if (isWithinInterval(startDate, interval)) {
                yield {
                    start: startDate,
                    end: interval.end
                }
            } else {
                yield interval
            }
            i++
        }
    }
}
