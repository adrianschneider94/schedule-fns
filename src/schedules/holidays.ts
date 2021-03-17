import DateHolidays, {Country, Options} from "date-holidays"

import {DateTimeImplementation, DTypes, Schedule} from "../index"
import {directionToInt} from "../functions/misc"
import {ScheduleFromIntervals} from "./scheduleFromIntervals"


export function Holidays<T extends DTypes>(impl: DateTimeImplementation<T>): (country?: Country | string, opts?: Options) => Schedule<T>
export function Holidays<T extends DTypes>(impl: DateTimeImplementation<T>): (country?: string, state?: string, opts?: Options) => Schedule<T>
export function Holidays<T extends DTypes>(impl: DateTimeImplementation<T>): (country?: string, state?: string, region?: string, opts?: Options) => Schedule<T>


export function Holidays<T extends DTypes>(impl: DateTimeImplementation<T>) {
    function Inner<T extends DTypes>(country?: Country | string, opts?: Options): Schedule<T>
    function Inner<T extends DTypes>(country?: string, state?: string, opts?: Options): Schedule<T>
    function Inner<T extends DTypes>(country?: string, state?: string, region?: string, opts?: Options): Schedule<T>

    function Inner(...args: any): Schedule<T> {
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
