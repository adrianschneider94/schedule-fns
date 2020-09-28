import {setISODay} from "date-fns"
import {zonedTimeToUtc} from "date-fns-tz"

import {invertSchedule, joinSchedules, RegularSchedule, Schedule} from "../index"
import {getUserTimeZone, stripTime} from "../functions/misc"

/**
 * Returns a schedule that occurs on a weekday specified by an integer in a given timezone.
 *
 * @param day The day as number (Monday = 1, Sunday = 7)
 * @param timeZone
 * @constructor
 * @internal
 * @category Schedules
 */
export function OnSpecificWeekday(day: number, timeZone: string = getUserTimeZone()): Schedule {
    return function (startDate, direction) {
        let startDateWithoutTimeISO = stripTime(startDate)
        let weekday = setISODay(startDateWithoutTimeISO, day)
        let startDayMoment = zonedTimeToUtc(weekday.toISOString().slice(0, -1), timeZone)
        let schedule = RegularSchedule(startDayMoment, {days: 1}, {weeks: 1})
        return schedule(startDate, direction)
    }
}

/**
 * Every monday.
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Mondays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(1, timeZone)
}

/**
 * Every tuesday.
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Tuesdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(2, timeZone)
}

/**
 * Every wednesday.
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Wednesdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(3, timeZone)
}

/**
 * Every thursday.
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Thursdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(4, timeZone)
}

/**
 * Every friday.
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Fridays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(5, timeZone)
}

/**
 * Every saturday.
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Saturdays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(6, timeZone)
}

/**
 * Every sunday.
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Sundays(timeZone: string = getUserTimeZone()): Schedule {
    return OnSpecificWeekday(7, timeZone)
}

/**
 * On the weekend (Saturday and Sundays).
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function Weekends(timeZone: string = getUserTimeZone()): Schedule {
    return joinSchedules(Saturdays(timeZone), Sundays(timeZone))
}

/**
 * On a working day (Mo-Fr).
 *
 * @param timeZone
 * @constructor
 * @category Weekday Schedules
 */
export function WorkingDays(timeZone: string = getUserTimeZone()): Schedule {
    return invertSchedule(Weekends(timeZone))
}