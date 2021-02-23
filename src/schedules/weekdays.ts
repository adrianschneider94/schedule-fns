import {DateTimeImplementation, DTypes, Schedule} from "../index"
import {RegularSchedule} from "./regularSchedule"
import {invertSchedule, joinSchedules} from "../operations"

export type WeekDayOptions = {
    timeZone?: string
}

/**
 * Returns a Schedule<DT,I,D> that occurs on a weekday specified by an integer.
 *
 * @param day The day as number (Monday = 1, Sunday = 7)
 * @param options
 * @constructor
 * @internal
 * @category Schedules
 */
export const OnSpecificWeekday = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, options?: WeekDayOptions): Schedule<T> {
            let timeZone = options?.timeZone

            return function (startDate, direction) {
                let weekday = impl.setISODay(startDate, day)
                let startDayMoment = impl.startOfDay(weekday, timeZone)
                let schedule = RegularSchedule(impl)(startDayMoment, impl.durationFromDurationObject({days: 1}), impl.durationFromDurationObject({weeks: 1}))
                return schedule(startDate, direction)
            }
        }
)

/**
 * Every monday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export const Mondays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return OnSpecificWeekday(impl)(1, options)
        }

)

/**
 * Every tuesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export const Tuesdays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return OnSpecificWeekday(impl)(2, options)
        }

)

/**
 * Every wednesday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export const Wednesdays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return OnSpecificWeekday(impl)(3, options)
        }

)

/**
 * Every thursday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export const Thursdays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return OnSpecificWeekday(impl)(4, options)
        }

)

/**
 * Every friday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export const Fridays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return OnSpecificWeekday(impl)(5, options)
        }

)

/**
 * Every saturday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export const Saturdays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return OnSpecificWeekday(impl)(6, options)
        }

)

/**
 * Every sunday.
 *
 * @constructor
 * @category Weekday Schedules
 */
export const Sundays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return OnSpecificWeekday(impl)(7, options)
        }

)

/**
 * On the weekend (Saturday and Sundays).
 * @constructor
 * @category Weekday Schedules
 */
export const Weekends = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return joinSchedules(impl)(Saturdays(impl)(options), Sundays(impl)(options))
        }

)

/**
 * On a working day (Mo-Fr).
 *
 * @constructor
 * @category Weekday Schedules
 */
export const WorkingDays = (
    <T extends DTypes>(impl: DateTimeImplementation<T>) =>

        function (options?: WeekDayOptions): Schedule<T> {
            return invertSchedule(impl)(Weekends(impl)(options))
        }

)