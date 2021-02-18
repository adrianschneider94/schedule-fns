import {DateTime, Duration, Schedule} from "../index"
import {addDurations, durationToMilliseconds, multiplyDuration} from "../functions/durations"
import {
    addDuration,
    createInterval,
    differenceInMilliseconds,
    directionToInt,
    isWithinInterval
} from "../functions/misc"

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
export function RegularSchedule(oneStartMoment: DateTime, duration: Duration, period: Duration): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)
        let numberOfPeriods: number = 0

        if (oneStartMoment <= startDate) {
            numberOfPeriods = Math.floor(differenceInMilliseconds(startDate, oneStartMoment) / durationToMilliseconds(period))

            if (directionInt === 1 && addDuration(oneStartMoment, addDurations(multiplyDuration(period, numberOfPeriods), duration)) <= startDate) {
                numberOfPeriods += 1
            }
        }

        let firstIntervalStartsAt = addDuration(oneStartMoment, multiplyDuration(period, numberOfPeriods))

        let i = 0
        while (true) {
            let start = addDuration(firstIntervalStartsAt, multiplyDuration(period, i))

            let interval = createInterval(
                start,
                addDuration(start, duration)
            )

            if (directionInt === 1 && isWithinInterval(startDate, interval)) {
                yield createInterval(startDate, interval.end)
            } else if (directionInt === -1 && isWithinInterval(startDate, interval)) {
                yield createInterval(interval.start, startDate)
            } else {
                yield interval
            }
            i += directionInt
        }
    }
}