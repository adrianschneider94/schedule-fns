import {Schedule} from "schedule.js"
import {directionToInt} from "../misc/misc"
import {ScheduleFnsLibrary} from "../library"

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
export type DailySchedule<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, startTime: string, endTime: string, options?: {timeZone?: string}) => Schedule<DT, I, D>

export const DailySchedule: DailySchedule<any, any, any> =
    function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, startTime: string, endTime: string, options?: {timeZone?: string}): Schedule<DT, I, D> {
        let timeZone = options?.timeZone

        let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = 1) {
            let directionInt = directionToInt(direction)

            let day = this.startOfDay(startDate, timeZone)
            let dayBefore = this.addDays(day, -1)
            let overMidnight: boolean = this.parseTimeAtGivenDay(startTime, day, timeZone) > this.parseTimeAtGivenDay(endTime, day, timeZone)

            let firstInterval = this.createInterval(
                overMidnight ? this.parseTimeAtGivenDay(startTime, dayBefore, timeZone) : this.parseTimeAtGivenDay(startTime, day, timeZone),
                this.parseTimeAtGivenDay(endTime, day, timeZone)
            )

            let i = 0
            while (true) {
                let interval = this.createInterval(
                    this.addDays(this.getIntervalStart(firstInterval), i),
                    this.addDays(this.getIntervalEnd(firstInterval), i)
                )
                i += directionInt

                if ((directionInt === 1 && this.isAfter(startDate, this.getIntervalEnd(interval))) || (directionInt === -1 && this.isBefore(startDate, this.getIntervalStart(interval)))) {
                    continue
                }

                if (this.intervalContains(interval, startDate)) {
                    if (directionInt === 1) {
                        yield this.createInterval(
                            startDate,
                            this.getIntervalEnd(interval)
                        )
                    } else {
                        yield this.createInterval(
                            this.getIntervalStart(interval),
                            startDate
                        )
                    }
                } else {
                    yield interval
                }
            }
        }
        return generator.bind(this)
    }