import DateHolidays, {Country, Options} from "date-holidays"

import {DateTimeImplementation, Schedule} from "../index"
import {directionToInt} from "../functions/misc"
import {ScheduleFromIntervals} from "./scheduleFromIntervals"


export function Holidays<DT, I, D>(impl: DateTimeImplementation<DT, I, D>): (country?: Country | string, opts?: Options) => Schedule<DT, I, D>
export function Holidays<DT, I, D>(impl: DateTimeImplementation<DT, I, D>): (country?: string, state?: string, opts?: Options) => Schedule<DT, I, D>
export function Holidays<DT, I, D>(impl: DateTimeImplementation<DT, I, D>): (country?: string, state?: string, region?: string, opts?: Options) => Schedule<DT, I, D>


export function Holidays<DT, I, D>(impl: DateTimeImplementation<DT, I, D>) {
    function Inner<DT, I, D>(country?: Country | string, opts?: Options): Schedule<DT, I, D>
    function Inner<DT, I, D>(country?: string, state?: string, opts?: Options): Schedule<DT, I, D>
    function Inner<DT, I, D>(country?: string, state?: string, region?: string, opts?: Options): Schedule<DT, I, D>

    function Inner(...args: any): Schedule<DT, I, D> {
        return function* (startDate, direction = "forward") {
            let directionInt = directionToInt(direction)

            let holidays = new DateHolidays()
            holidays.init(...args)

            let year = impl.getYear(startDate)
            while (true) {
                let innerSchedule = ScheduleFromIntervals(impl)(...holidays.getHolidays(year).map(holiday => (impl.createInterval(
                    impl.parseJsDateTime(holiday.start),
                    impl.parseJsDateTime(holiday.end)
                ))))
                for (let interval of innerSchedule(startDate, direction)) {
                    yield interval
                }
                year += directionInt
            }
        }
    }

    return Inner
}
