import {Schedule} from "schedule.js"
import {directionToInt} from "../misc/misc"
import {ScheduleFnsLibrary} from "../library"


export type invertSchedule<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, schedule: Schedule<DT, I, D>) => Schedule<DT, I, D>
/**
 * Inverts a schedule
 *
 * @param schedule
 * @category Operations
 */
export const invertSchedule: invertSchedule<any, any, any> =
    function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, schedule: Schedule<DT, I, D>): Schedule<DT, I, D> {
        let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = "forward") {
            let directionInt = directionToInt(direction)

            let generator = schedule(startDate, direction)
            let last: I = generator.next().value

            if (last === undefined && directionInt === 1) {
                yield this.createInterval(startDate, this.infinityDateTime)
            } else if (last === undefined && directionInt === -1) {
                yield this.createInterval(this.negativeInfinityDateTime, startDate)
            } else if (directionInt === 1 && !this.isEqual(startDate, this.getIntervalStart(last))) {
                yield this.createInterval(startDate, this.getIntervalStart(last))
            } else if (directionInt === -1 && !this.isEqual(startDate, this.getIntervalEnd(last))) {
                yield this.createInterval(this.getIntervalEnd(last), startDate)
            }

            for (const interval of generator) {
                if (directionInt === 1) {
                    yield this.createInterval(this.getIntervalEnd(last), this.getIntervalStart(interval))
                } else {
                    yield this.createInterval(this.getIntervalEnd(interval), this.getIntervalStart(last))
                }
                last = interval
            }

            if (directionInt === 1 && last && !this.isEqual(this.getIntervalEnd(last), this.infinityDateTime)) {
                yield this.createInterval(this.getIntervalEnd(last), this.infinityDateTime)
            } else if (directionInt === -1 && last && !this.isEqual(this.getIntervalEnd(last), this.negativeInfinityDateTime)) {
                yield this.createInterval(this.negativeInfinityDateTime, this.getIntervalStart(last))
            }
        }
        return generator.bind(this)
    }