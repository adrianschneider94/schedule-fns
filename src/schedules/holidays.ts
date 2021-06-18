import DateHolidays, {Country, Options} from "date-holidays"

import {Schedule} from "../index"
import {directionToInt} from "../misc/misc"
import {ScheduleFnsLibrary} from "../implementations"


export function Holidays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, country?: Country | string, opts?: Options): Schedule<DT, I, D>
export function Holidays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, country?: string, state?: string, opts?: Options): Schedule<DT, I, D>
export function Holidays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, country?: string, state?: string, region?: string, opts?: Options): Schedule<DT, I, D>

/**
 * Returns a schedule according to the holiday calendar of a region.
 *
 * The API resembles the API of date-holidays which is used internally. See the
 * [documentation of date-holidays](https://github.com/commenthol/date-holidays) for further information.
 *
 * @param args
 * @constructor
 * @category Schedules
 */
export function Holidays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, ...args: any): Schedule<DT, I, D> {
    let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        let holidays = new DateHolidays()
        holidays.init(...args)

        let year = this.getYear(startDate)
        while (true) {
            let innerSchedule = this.ScheduleFromIntervals(...holidays.getHolidays(year).map(holiday => (this.createInterval(
                this.dateTimeFromDateOrNumber(holiday.start),
                this.dateTimeFromDateOrNumber(holiday.end)
            ))))
            for (let interval of innerSchedule(startDate, direction)) {
                yield interval
            }
            year += directionInt
        }
    }
    return generator.bind(this)
}

