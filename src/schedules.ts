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

export function RegularSchedule(firstOccurence: Date | number, duration: Duration, period: Duration): Schedule {
    return function* (startDate) {
        if (firstOccurence <= startDate) {
            let fullPeriodsBeforeStartDate = Math.floor(differenceInMilliseconds(startDate, firstOccurence) / durationToMilliseconds(period))
            firstOccurence = add(firstOccurence, multiplyDuration(period, fullPeriodsBeforeStartDate))
            if (add(firstOccurence, duration) <= startDate) {
                firstOccurence = add(firstOccurence, period)
            }
        }
        let i = 0
        while (true) {
            let start = add(firstOccurence, multiplyDuration(period, i))
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