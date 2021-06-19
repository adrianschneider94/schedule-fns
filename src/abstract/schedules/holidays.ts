import DateHolidays, {Country, Options} from "date-holidays"

import {Schedule} from "schedule.js"
import {directionToInt} from "../misc/misc"
import {ScheduleFnsLibrary} from "../library"

type Opts = {
    country: Country | string,
    state?: string,
    region?: string,
    options?: Options
}

export type Holidays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options: Opts) => Schedule<DT, I, D>


/**
 * Returns a schedule according to the holiday calendar of a region.
 *
 * The API resembles the API of date-holidays which is used internally. See the
 * [documentation of date-holidays](https://github.com/commenthol/date-holidays) for further information.
 */
export const Holidays: Holidays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options: Opts): Schedule<DT, I, D> {
    let generator: Schedule<DT, I, D> = function* (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        let holidays = new DateHolidays()
        if (options.country && typeof options.country == "string" && options.state && options.region) {
            holidays.init(options.country, options.state, options.region, options.options)
        } else if (options.country && typeof options.country == "string" && options.state) {
            holidays.init(options.country, options.state, options.options)
        } else {
            holidays.init(options.country, options.options)
        }

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

