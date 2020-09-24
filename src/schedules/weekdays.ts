import {RegularSchedule, Schedule} from "../index"
import {setISODay} from "date-fns"
import {zonedTimeToUtc} from "date-fns-tz"
import {getUserTimeZone, stripTime} from "../functions/misc"

export function OnSpecificWeekday(day: number, timeZone: string = getUserTimeZone()): Schedule {
    return function (startDate, direction) {
        let startDateWithoutTimeISO = stripTime(startDate)
        let weekday = setISODay(startDateWithoutTimeISO, day)
        let startDayMoment = zonedTimeToUtc(weekday.toISOString().slice(0, -1), timeZone)
        let schedule = RegularSchedule(startDayMoment, {days: 1}, {weeks: 1})
        return schedule(startDate, direction)
    }
}

export function Mondays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(1, timeZone)
}

export function Tuesdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(2, timeZone)
}

export function Wednesdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(3, timeZone)
}

export function Thursdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(4, timeZone)
}

export function Fridays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(5, timeZone)
}

export function Saturdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(6, timeZone)
}

export function Sundays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(7, timeZone)
}