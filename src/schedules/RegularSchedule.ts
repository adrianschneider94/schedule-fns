import {Schedule} from "../index"
import {add, differenceInMilliseconds, isWithinInterval} from "date-fns"
import {addDurations, durationToMilliseconds, multiplyDuration} from "../functions/durations"
import {directionToInt} from "../functions/misc"

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