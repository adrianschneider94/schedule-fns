import {add, differenceInMilliseconds, isWithinInterval} from "date-fns"

import {Duration, Schedule} from "../index"
import {addDurations, durationToMilliseconds, multiplyDuration} from "../functions/durations"
import {directionToInt} from "../functions/misc"

/**
 * Constructs a regularly occurring schedule.
 *
 * The function takes a date, a duration and a period to construct the schedule. The schedule will contain
 * the interval defined by the date and the duration and all intervals that are shifted by n * period.
 * It extends into the future and the past.
 *
 * @param oneStartMoment
 * @param duration
 * @param period
 * @constructor
 * @category Schedules
 */
export function RegularSchedule(oneStartMoment: Date | number, duration: Duration, period: Duration): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)
        let numberOfPeriods: number = 0

        if (oneStartMoment <= startDate) {
            numberOfPeriods = Math.floor(differenceInMilliseconds(startDate, oneStartMoment) / durationToMilliseconds(period))

            if (directionInt === 1 && add(oneStartMoment, addDurations(multiplyDuration(period, numberOfPeriods), duration)) <= startDate) {
                numberOfPeriods += 1
            }
        }

        let firstIntervalStartsAt = add(oneStartMoment, multiplyDuration(period, numberOfPeriods))

        let i = 0
        while (true) {
            let start = add(firstIntervalStartsAt, multiplyDuration(period, i))

            let interval = {
                start: start,
                end: add(start, duration)
            }

            if (directionInt === 1 && isWithinInterval(startDate, interval)) {
                yield {
                    start: startDate,
                    end: interval.end
                }
            } else if (directionInt === -1 && isWithinInterval(startDate, interval)) {
                yield {
                    start: interval.start,
                    end: startDate
                }
            } else {
                yield interval
            }
            i += directionInt
        }
    }
}