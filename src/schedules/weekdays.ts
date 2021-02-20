import {durationFromDurationObject, invertSchedule, joinSchedules, RegularSchedule, Schedule} from "../index"
import {setISODay} from "../functions/misc"
import {startOfDay} from "../functions/dateLibrary"

export type WeekDayOptions = {
    timeZone?: string
}

/**
 * Returns a schedule that occurs on a weekday specified by an integer.
 *
 * @param day The day as number (Monday = 1, Sunday = 7)
 * @param options
 * @constructor
 * @internal
 * @category Schedules
 */
export function OnSpecificWeekday(day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, options?: WeekDayOptions): Schedule {
    let timeZone = options?.timeZone

    return function (startDate, direction) {
        let weekday = setISODay(startDate, day)
        let startDayMoment = startOfDay(weekday, timeZone)
        let schedule = RegularSchedule(startDayMoment, durationFromDurationObject({days: 1}), durationFromDurationObject({weeks: 1}))
        return schedule(startDate, direction)
    }
}

/**
 * Every monday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Mondays(options?: WeekDayOptions): Schedule {
    return OnSpecificWeekday(1, options)
}

/**
 * Every tuesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Tuesdays(options?: WeekDayOptions): Schedule {
    return OnSpecificWeekday(2, options)
}

/**
 * Every wednesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Wednesdays(options?: WeekDayOptions): Schedule {
    return OnSpecificWeekday(3, options)
}

/**
 * Every thursday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Thursdays(options?: WeekDayOptions): Schedule {
    return OnSpecificWeekday(4, options)
}

/**
 * Every friday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Fridays(options?: WeekDayOptions): Schedule {
    return OnSpecificWeekday(5, options)
}

/**
 * Every saturday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Saturdays(options?: WeekDayOptions): Schedule {
    return OnSpecificWeekday(6, options)
}

/**
 * Every sunday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Sundays(options?: WeekDayOptions): Schedule {
    return OnSpecificWeekday(7, options)
}

/**
 * On the weekend (Saturday and Sundays).
 * @constructor
 * @category Weekday Schedules
 */
export function Weekends(options?: WeekDayOptions): Schedule {
    return joinSchedules(Saturdays(options), Sundays(options))
}

/**
 * On a working day (Mo-Fr).
 *
 * @constructor
 * @category Weekday Schedules
 */
export function WorkingDays(options?: WeekDayOptions): Schedule {
    return invertSchedule(Weekends(options))
}