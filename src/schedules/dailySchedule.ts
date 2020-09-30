import {add, isWithinInterval, parse} from "date-fns"
import {format, zonedTimeToUtc} from "date-fns-tz"

import {Interval, Schedule} from "../index"
import {directionToInt, getUserTimeZone, isoFormatTime} from "../functions/misc"

/**
 * Creates a daily schedule.
 *
 * If the start time is **after** the end time, the interval will pass midnight.
 *
 * @param startTime The start time in the format specified by timeFormat.
 * @param endTime The start time in the format specified by timeFormat.
 * @param Options
 * @param Options.timeZone The time zone as an IANA code (e.g. Etc/UTC).
 * @param Options.timeFormat The time format according to the (https://date-fns.org/docs/parse)[parse specification of date-fns].
 * @constructor
 * @category Schedules
 */
export function DailySchedule(startTime: string, endTime: string, {timeZone, timeFormat}: { timeZone?: string, timeFormat?: string } = {}): Schedule {
    // Apply default value
    let timeFormatParsed = timeFormat || "HH:mm"
    let timeZoneParsed = timeZone || getUserTimeZone()

    // Bring times into ISO format HH:mm:ss.SSS
    startTime = isoFormatTime(startTime, timeFormatParsed)
    endTime = isoFormatTime(endTime, timeFormatParsed)

    return function* (startDate, direction = 1) {
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
                start: zonedTimeToUtc(intervalString.start, timeZoneParsed),
                end: zonedTimeToUtc(intervalString.end, timeZoneParsed)
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