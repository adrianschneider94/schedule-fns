import {Schedule} from "../index"
import {ScheduleFnsLibrary} from "../implementations"

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
export function OnSpecificWeekday<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, options?: WeekDayOptions): Schedule<DT, I, D> {
    let timeZone = options?.timeZone

    let generator: Schedule<DT, I, D> = function (this: ScheduleFnsLibrary<DT, I, D>, startDate, direction) {
        let weekday = this.setISODay(startDate, day)
        let startDayMoment = this.startOfDay(weekday, timeZone)
        let schedule = this.RegularSchedule(startDayMoment, this.durationFromDurationObject({days: 1}), this.durationFromDurationObject({weeks: 1}))
        return schedule(startDate, direction)
    }
    return generator.bind(this)
}

/**
 * Every monday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Mondays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(1, options)
}

/**
 * Every tuesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Tuesdays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(2, options)
}

/**
 * Every wednesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Wednesdays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(3, options)
}

/**
 * Every thursday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Thursdays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(4, options)
}

/**
 * Every friday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Fridays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(5, options)
}

/**
 * Every saturday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Saturdays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(6, options)
}

/**
 * Every sunday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export function Sundays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(7, options)
}

/**
 * On the weekend (Saturday and Sundays).
 * @constructor
 * @category Weekday Schedules
 */
export function Weekends<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.joinSchedules(this.Saturdays(options), this.Sundays(options))
}

/**
 * On a working day (Mo-Fr).
 *
 * @constructor
 * @category Weekday Schedules
 */
export function WorkingDays<DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.invertSchedule(this.Weekends(options))
}