import {addDays, isWithinInterval, parse, startOfDay} from "date-fns"
import {Interval, Schedule} from "../index"
import {directionToInt, isoFormatTime} from "../functions/misc"

/**
 * Creates a daily schedule.
 *
 * If the start time is **after** the end time, the interval will pass midnight.
 *
 * @param startTime The start time in the format specified by timeFormat.
 * @param endTime The start time in the format specified by timeFormat.
 * @param Options
 * @param Options.timeFormat The time format according to the (https://date-fns.org/docs/parse)[parse specification of date-fns].
 * @constructor
 * @category Schedules
 */
export function DailySchedule(startTime: string, endTime: string, {timeFormat}: {timeFormat?: string} = {}): Schedule {
    // Apply default value
    let timeFormatParsed = timeFormat || "HH:mm"

    // Bring times into ISO format HH:mm:ss.SSS
    startTime = isoFormatTime(startTime, timeFormatParsed)
    endTime = isoFormatTime(endTime, timeFormatParsed)

    return function* (startDate, direction = 1) {
        let directionInt = directionToInt(direction)

        let day = startOfDay(startDate)
        let dayBefore = addDays(day, -1)
        let overMidnight: boolean = parse(startTime, "HH:mm:ss.SSS", day) > parse(endTime, "HH:mm:ss.SSS", day)

        let firstInterval: Interval = {
            start: overMidnight ? parse(startTime, "HH:mm:ss.SSS", dayBefore) : parse(startTime, "HH:mm:ss.SSS", day),
            end: parse(endTime, "HH:mm:ss.SSS", day)
        }

        let i = 0
        while (true) {
            let interval = {
                start: addDays(firstInterval.start, i),
                end: addDays(firstInterval.end, i)
            }
            i += directionInt

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