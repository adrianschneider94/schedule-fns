import {Schedule} from "schedule.js"
import {ScheduleFnsLibrary} from "../library"

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
export type OnSpecificWeekday<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, options?: WeekDayOptions) => Schedule<DT, I, D>

export const OnSpecificWeekday: OnSpecificWeekday<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, options?: WeekDayOptions): Schedule<DT, I, D> {
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
export type Mondays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>

export const Mondays: Mondays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(1, options)
}

/**
 * Every tuesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export type Tuesdays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>

export const Tuesdays: Tuesdays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(2, options)
}

/**
 * Every wednesday.
 *
 * @constructor
 * @category Weekday Schedules
 */

export type Wednesdays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>

export const Wednesdays: Wednesdays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(3, options)
}

/**
 * Every thursday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export type  Thursdays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>
export const Thursdays: Thursdays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(4, options)
}

/**
 * Every friday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export type Fridays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>

export const Fridays: Fridays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(5, options)
}

/**
 * Every saturday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export type Saturdays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>

export const Saturdays: Saturdays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(6, options)
}

/**
 * Every sunday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export type Sundays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>
export const Sundays: Sundays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.OnSpecificWeekday(7, options)
}

/**
 * On the weekend (Saturday and Sundays).
 * @constructor
 * @category Weekday Schedules
 */
export type Weekends<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>

export const Weekends: Weekends<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.joinSchedules(this.Saturdays(options), this.Sundays(options))
}

/**
 * On a working day (Mo-Fr).
 *
 * @constructor
 * @category Weekday Schedules
 */
export type  WorkingDays<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions) => Schedule<DT, I, D>
export const WorkingDays: WorkingDays<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, options?: WeekDayOptions): Schedule<DT, I, D> {
    return this.invertSchedule(this.Weekends(options))
}