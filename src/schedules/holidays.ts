import {Schedule, ScheduleFromIntervals} from "../index"
import DateHolidays, {Country, Options} from "date-holidays"
import {getYear} from "date-fns"
import {directionToInt} from "../functions/misc"

export function Holidays(country?: Country | string, opts?: Options): Schedule
export function Holidays(country?: string, state?: string, opts?: Options): Schedule
export function Holidays(country?: string, state?: string, region?: string, opts?: Options): Schedule

export function Holidays(...args: any): Schedule {
    return function* (startDate, direction = "forward") {
        let directionInt = directionToInt(direction)

        let holidays = new DateHolidays()
        holidays.init(...args)

        let year = getYear(startDate)
        while (true) {
            let innerSchedule = ScheduleFromIntervals(...holidays.getHolidays(year).map(holiday => ({
                start: holiday.start,
                end: holiday.end
            })))
            for (let interval of innerSchedule(startDate, direction)) {
                yield interval
            }
            year += directionInt
        }
    }
}

