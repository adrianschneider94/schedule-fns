import * as operations from "schedule.js/operations"
import * as schedules from "schedule.js/schedules"
import * as functions from "schedule.js/functions"
import {DateFnsImplementation, DateFnsTypes} from "schedule.js/date-fns/implementation"
import {Exports} from "schedule.js"


// Operations
export const intersectSchedules = operations.intersectSchedules(DateFnsImplementation)
export const invertSchedule = operations.invertSchedule(DateFnsImplementation)
export const joinSchedules = operations.joinSchedules(DateFnsImplementation)
export const shiftSchedule = operations.shiftSchedule(DateFnsImplementation)
export const subtractSchedules = operations.subtractSchedules(DateFnsImplementation)
export const symmetricDifferenceOfSchedules = operations.symmetricDifferenceOfSchedules(DateFnsImplementation)

// Schedules
export const DailySchedule = schedules.DailySchedule(DateFnsImplementation)
export const Holidays = schedules.Holidays(DateFnsImplementation) as Exports<DateFnsTypes>['Holidays']
export const RegularSchedule = schedules.RegularSchedule(DateFnsImplementation)
export const ScheduleFromIntervals = schedules.ScheduleFromIntervals(DateFnsImplementation)
export const From = schedules.From(DateFnsImplementation)
export const Until = schedules.Until(DateFnsImplementation)
export const Mondays = schedules.Mondays(DateFnsImplementation)
export const Tuesdays = schedules.Tuesdays(DateFnsImplementation)
export const Wednesdays = schedules.Wednesdays(DateFnsImplementation)
export const Thursdays = schedules.Thursdays(DateFnsImplementation)
export const Fridays = schedules.Fridays(DateFnsImplementation)
export const Saturdays = schedules.Saturdays(DateFnsImplementation)
export const Sundays = schedules.Sundays(DateFnsImplementation)
export const WorkingDays = schedules.WorkingDays(DateFnsImplementation)
export const Weekends = schedules.Weekends(DateFnsImplementation)

// Misc
export const addDurationWithinSchedule = functions.addDurationWithinSchedule(DateFnsImplementation)
export const isWithinSchedule = functions.isWithinSchedule(DateFnsImplementation)
export const addDurations = functions.addDurations(DateFnsImplementation)
export const areIntervalsIntersecting = functions.areIntervalsIntersecting(DateFnsImplementation)
export const areIntervalsConnected = functions.areIntervalsConnected(DateFnsImplementation)
export const areIntervalsEqual = functions.areIntervalsEqual(DateFnsImplementation)
export const joinIntervals = functions.joinIntervals(DateFnsImplementation)
export const mergeIntervals = functions.mergeIntervals(DateFnsImplementation)
export const intersectIntervals = functions.intersectIntervals(DateFnsImplementation)

let DateFnsExports: Exports<DateFnsTypes> = {
    intersectSchedules,
    invertSchedule,
    joinSchedules,
    shiftSchedule,
    subtractSchedules,
    symmetricDifferenceOfSchedules,
    DailySchedule,
    Holidays,
    RegularSchedule,
    ScheduleFromIntervals,
    From,
    Until,
    Mondays,
    Tuesdays,
    Wednesdays,
    Thursdays,
    Fridays,
    Saturdays,
    Sundays,
    WorkingDays,
    Weekends,
    addDurationWithinSchedule,
    isWithinSchedule,
    addDurations,
    areIntervalsIntersecting,
    areIntervalsConnected,
    areIntervalsEqual,
    joinIntervals,
    mergeIntervals,
    intersectIntervals
}
export default DateFnsExports