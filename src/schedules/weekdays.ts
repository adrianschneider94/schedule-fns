import {invertSchedule, joinSchedules, RegularSchedule, Schedule} from "../index"
import {setISODay, startOfDay} from "schedule-fns/functions/misc"
import {durationFromDurationObject} from "schedule-fns/functions/durations"

/**
 * Returns a schedule that occurs on a weekday specified by an integer.
 *
 * @param day The day as number (Monday = 1, Sunday = 7)
 * @constructor
 * @internal
 * @category Schedules
 */
export function OnSpecificWeekday(day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): Schedule {
    return function (startDate, direction) {
        let weekday = setISODay(startDate, day)
        let startDayMoment = startOfDay(weekday)
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
export function Mondays(): Schedule {
    return OnSpecificWeekday(1)
}

/**
 * Every tuesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Tuesdays(): Schedule {
    return OnSpecificWeekday(2)
}

/**
 * Every wednesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Wednesdays(): Schedule {
    return OnSpecificWeekday(3)
}

/**
 * Every thursday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Thursdays(): Schedule {
    return OnSpecificWeekday(4)
}

/**
 * Every friday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Fridays(): Schedule {
    return OnSpecificWeekday(5)
}

/**
 * Every saturday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Saturdays(): Schedule {
    return OnSpecificWeekday(6)
}

/**
 * Every sunday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Sundays(): Schedule {
    return OnSpecificWeekday(7)
}

/**
 * On the weekend (Saturday and Sundays).
 * @constructor
 * @category Weekday Schedules
 */
export function Weekends(): Schedule {
    return joinSchedules(Saturdays(), Sundays())
}

/**
 * On a working day (Mo-Fr).
 *
 * @constructor
 * @category Weekday Schedules
 */
export function WorkingDays(): Schedule {
    return invertSchedule(Weekends())
}