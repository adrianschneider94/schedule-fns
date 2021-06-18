import {Schedule} from "../index"
import {directionToInt} from "../misc/misc"
import {ScheduleFnsLibrary} from "../implementations"

/**
 * Returns a schedule from the given intervals.
 *
 * @param intervals
 * @constructor
 * @category Schedules
 */
export function ScheduleFromIntervals<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, ...intervals: Array<I>): Schedule<DT, I, D> {
    let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        if (directionInt === 1) {
            intervals = this.mergeIntervals(...intervals).filter(interval => this.isEqualOrAfter(this.getIntervalEnd(interval), startDate))
        } else {
            intervals = this.mergeIntervals(...intervals).filter(interval => this.isEqualOrBefore(this.getIntervalStart(interval), startDate)).reverse()
        }

        for (const interval of intervals) {
            if (directionInt === 1 && this.intervalContains(interval, startDate)) {
                yield this.createInterval(startDate, this.getIntervalEnd(interval))
            } else if (directionInt === -1 && this.intervalContains(interval, startDate)) {
                yield this.createInterval(this.getIntervalStart(interval), startDate)
            } else {
                yield interval
            }
        }
    }
    return generator.bind(this)
}