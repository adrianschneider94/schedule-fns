import DateHolidays, {Country, Options} from "date-holidays"

import {Schedule, ScheduleFromIntervals} from "../index"
import {createInterval, directionToInt, getYear, parseJsDateTime} from "../functions/misc"

export function Holidays(country?: Country | string, opts?: Options): Schedule
export function Holidays(country?: string, state?: string, opts?: Options): Schedule
export function Holidays(country?: string, state?: string, region?: string, opts?: Options): Schedule

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
export function Holidays(...args: any): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        let holidays = new DateHolidays()
        holidays.init(...args)

        let year = getYear(startDate)
        while (true) {
            let innerSchedule = ScheduleFromIntervals(...holidays.getHolidays(year).map(holiday => (createInterval(
                parseJsDateTime(holiday.start),
                parseJsDateTime(holiday.end)
            ))))
            for (let interval of innerSchedule(startDate, direction)) {
                yield interval
            }
            year += directionInt
        }
    }
}

