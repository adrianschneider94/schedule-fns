import {Schedule} from "../index"
import {directionToInt, getUserTimeZone, isoFormatTime} from "../functions/misc"
import {add, isWithinInterval, parse} from "date-fns"
import {format, zonedTimeToUtc} from "date-fns-tz"


type options = {
    timeZone?: string
    timeFormat?: string
}

export function DailySchedule(startTime: string, endTime: string, options?: options): Schedule {
    let timeFormat = options?.timeFormat || "HH:mm"
    let timeZone = options?.timeZone || getUserTimeZone()

    return function* (startDate, direction = 1) {
        // Bring times into ISO format HH:mm:ss.SSS
        startTime = isoFormatTime(startTime, timeFormat)
        endTime = isoFormatTime(endTime, timeFormat)
        let directionInt = directionToInt(direction)

        let i = 0
        while (true) {
            let day = format(add(startDate, {days: i}), "yyyy-MM-dd", {timeZone})
            let dayBefore = format(add(startDate, {days: i - 1}), "yyyy-MM-dd", {timeZone})
            let overMidnight: boolean = parse(startTime, "HH:mm:ss.SSS", new Date(0)) > parse(endTime, "HH:mm:ss.SSS", new Date(0))

            i += directionInt

            let intervalString: { start: string, end: string }

            if (!overMidnight) {
                intervalString = {
                    start: day + "T" + startTime,
                    end: day + "T" + endTime,
                }
            } else {
                intervalString = {
                    start: dayBefore + "T" + startTime,
                    end: day + "T" + endTime,
                }
            }

            let interval: Interval = {
                start: zonedTimeToUtc(intervalString.start, timeZone),
                end: zonedTimeToUtc(intervalString.end, timeZone)
            }

            if ((directionInt === 1 && startDate > interval.end) || (directionInt === -1 && startDate < interval.start)) {
                continue
            }

            if (isWithinInterval(startDate, interval)) {
                if (directionInt === 1) {
                    yield {
                        start: startDate,
                        end: interval.end
                    }
                } else {
                    yield {
                        start: interval.start,
                        end: startDate
                    }
                }
            } else {
                yield interval
            }

        }
    }
}