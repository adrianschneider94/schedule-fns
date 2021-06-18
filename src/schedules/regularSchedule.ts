import {Schedule} from "../index"
import {directionToInt} from "../misc/misc"
import {ScheduleFnsLibrary} from "../implementations"

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
export function RegularSchedule<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, oneStartMoment: DT, duration: D, period: D): Schedule<DT, I, D> {
    let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = "forward") {
        let directionInt = directionToInt(direction)
        let numberOfPeriods: number = 0

        if (oneStartMoment <= startDate) {
            let timeToStartMoment = this.intervalToMilliseconds(this.createInterval(startDate, oneStartMoment))
            numberOfPeriods = Math.floor(timeToStartMoment / this.durationToMilliseconds(period))

            if (directionInt === 1 && this.isEqualOrBefore(this.addDuration(oneStartMoment, this.addDurations(this.multiplyDuration(period, numberOfPeriods), duration)), startDate)) {
                numberOfPeriods += 1
            }
        }

        let firstIntervalStartsAt = this.addDuration(oneStartMoment, this.multiplyDuration(period, numberOfPeriods))

        let i = 0
        while (true) {
            let start = this.addDuration(firstIntervalStartsAt, this.multiplyDuration(period, i))

            let interval = this.createInterval(
                start,
                this.addDuration(start, duration)
            )

            if (directionInt === 1 && this.intervalContains(interval, startDate)) {
                yield this.createInterval(startDate, this.getIntervalEnd(interval))
            } else if (directionInt === -1 && this.intervalContains(interval, startDate)) {
                yield this.createInterval(this.getIntervalStart(interval), startDate)
            } else {
                yield interval
            }
            i += directionInt
        }
    }
    return generator.bind(this)
}