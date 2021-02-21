import {DateTimeImplementation, Schedule} from "../index"
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (day: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
            return OnSpecificWeekday(impl)(7, options)
        }

)

/**
 * On the weekend (Saturday and Sundays).
 * @constructor
 * @category Weekday Schedules
 */
export const Weekends = (
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
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
    <DT, I, D>(impl: DateTimeImplementation<DT, I, D>) =>

        function (options?: WeekDayOptions): Schedule<DT, I, D> {
            return invertSchedule(impl)(Weekends(impl)(options))
        }

)