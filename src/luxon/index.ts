import * as operations from "schedule.js/operations"
import * as schedules from "schedule.js/schedules"
import * as functions from "schedule.js/functions"
import {LuxonImplementation, LuxonTypes} from "schedule.js/luxon/implementation"
import {Exports} from "schedule.js"


// Operations
export const intersectSchedules = operations.intersectSchedules(LuxonImplementation)
export const invertSchedule = operations.invertSchedule(LuxonImplementation)
export const joinSchedules = operations.joinSchedules(LuxonImplementation)
export const shiftSchedule = operations.shiftSchedule(LuxonImplementation)
export const subtractSchedules = operations.subtractSchedules(LuxonImplementation)
export const symmetricDifferenceOfSchedules = operations.symmetricDifferenceOfSchedules(LuxonImplementation)

// Schedules
export const DailySchedule = schedules.DailySchedule(LuxonImplementation)
export const Holidays = schedules.Holidays(LuxonImplementation) as Exports<LuxonTypes>['Holidays']
export const RegularSchedule = schedules.RegularSchedule(LuxonImplementation)
export const ScheduleFromIntervals = schedules.ScheduleFromIntervals(LuxonImplementation)
export const From = schedules.From(LuxonImplementation)
export const Until = schedules.Until(LuxonImplementation)
export const Mondays = schedules.Mondays(LuxonImplementation)
export const Tuesdays = schedules.Tuesdays(LuxonImplementation)
export const Wednesdays = schedules.Wednesdays(LuxonImplementation)
export const Thursdays = schedules.Thursdays(LuxonImplementation)
export const Fridays = schedules.Fridays(LuxonImplementation)
export const Saturdays = schedules.Saturdays(LuxonImplementation)
export const Sundays = schedules.Sundays(LuxonImplementation)
export const WorkingDays = schedules.WorkingDays(LuxonImplementation)
export const Weekends = schedules.Weekends(LuxonImplementation)

// Misc
export const addDurationWithinSchedule = functions.addDurationWithinSchedule(LuxonImplementation)
export const isWithinSchedule = functions.isWithinSchedule(LuxonImplementation)
export const addDurations = functions.addDurations(LuxonImplementation)
export const areIntervalsIntersecting = functions.areIntervalsIntersecting(LuxonImplementation)
export const areIntervalsConnected = functions.areIntervalsConnected(LuxonImplementation)
export const areIntervalsEqual = functions.areIntervalsEqual(LuxonImplementation)
export const joinIntervals = functions.joinIntervals(LuxonImplementation)
export const mergeIntervals = functions.mergeIntervals(LuxonImplementation)
export const intersectIntervals = functions.intersectIntervals(LuxonImplementation)

let DateFnsExports: Exports<LuxonTypes> = {
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