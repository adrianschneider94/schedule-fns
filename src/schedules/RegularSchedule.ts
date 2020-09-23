import {Schedule} from "../index"
import {add, differenceInMilliseconds, isWithinInterval} from "date-fns"
import {addDurations, durationToMilliseconds, multiplyDuration} from "../functions/durations"
import {directionToInt} from "../functions/misc"

export function RegularSchedule(firstOccurrence: Date | number, duration: Duration, period: Duration): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)
        let numberOfPeriods: number = 0

        if (directionInt === 1 && firstOccurrence <= startDate) {
            numberOfPeriods = Math.floor(differenceInMilliseconds(startDate, firstOccurrence) / durationToMilliseconds(period))

            if (add(firstOccurrence, addDurations(multiplyDuration(period, numberOfPeriods), duration)) <= startDate) {
                numberOfPeriods += 1
            }
        } else if (directionInt === -1 && firstOccurrence >= startDate) {
            numberOfPeriods = -1 * Math.ceil(differenceInMilliseconds(firstOccurrence, startDate) / durationToMilliseconds(period))
        }

        firstOccurrence = add(firstOccurrence, multiplyDuration(period, numberOfPeriods))

        let i = 0
        while (true) {
            let start = add(firstOccurrence, multiplyDuration(period, directionInt * i))
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
            i++
        }
    }
}