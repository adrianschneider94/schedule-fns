import {Schedule} from "../index"
import {directionToInt, isWithinInterval} from "../functions/misc"
import {addDays, createInterval, isAfter, isBefore, parseTimeAtGivenDay, startOfDay} from "../functions/dateLibrary"

/**
 * Creates a daily schedule.
 *
 * If the start time is **after** the end time, the interval will pass midnight.
 *
 * @param startTime The start time in the format specified by timeFormat.
 * @param endTime The start time in the format specified by timeFormat.
 * @param options
 * @constructor
 * @category Schedules
 */
export function DailySchedule(startTime: string, endTime: string, options?: { timeZone?: string }): Schedule {
    let timeZone = options?.timeZone

    return function* (startDate, direction = 1) {
        let directionInt = directionToInt(direction)

        let day = startOfDay(startDate, timeZone)
        let dayBefore = addDays(day, -1)
        let overMidnight: boolean = parseTimeAtGivenDay(startTime, day, timeZone) > parseTimeAtGivenDay(endTime, day, timeZone)

        let firstInterval = createInterval(
            overMidnight ? parseTimeAtGivenDay(startTime, dayBefore, timeZone) : parseTimeAtGivenDay(startTime, day, timeZone),
            parseTimeAtGivenDay(endTime, day, timeZone)
        )

        let i = 0
        while (true) {
            let interval = createInterval(
                addDays(firstInterval.start, i),
                addDays(firstInterval.end, i)
            )
            i += directionInt

            if ((directionInt === 1 && isAfter(startDate, interval.end)) || (directionInt === -1 && isBefore(startDate, interval.start))) {
                continue
            }

            if (isWithinInterval(startDate, interval)) {
                if (directionInt === 1) {
                    yield createInterval(
                        startDate,
                        interval.end
                    )
                } else {
                    yield createInterval(
                        interval.start,
                        startDate
                    )
                }
            } else {
                yield interval
            }
        }
    }
}