import * as operations from "schedule.js/operations"
import * as schedules from "schedule.js/schedules"
import * as functions from "schedule.js/functions"
import {LuxonImplementation, LuxonTypes} from "schedule.js/luxon/implementation"
import {Exports} from "schedule.js"

export const intersectSchedules = operations.intersectSchedules(LuxonImplementation)
export const invertSchedule = operations.invertSchedule(LuxonImplementation)
export const joinSchedules = operations.joinSchedules(LuxonImplementation)
export const shiftSchedule = operations.shiftSchedule(LuxonImplementation)
export const subtractSchedules = operations.subtractSchedules(LuxonImplementation)
export const symmetricDifferenceOfSchedules = operations.symmetricDifferenceOfSchedules(LuxonImplementation)
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
export const addDurationWithinSchedule = functions.addDurationWithinSchedule(LuxonImplementation)
export const isWithinSchedule = functions.isWithinSchedule(LuxonImplementation)

export let dateFnsExports: Exports<LuxonTypes> = {
    intersectSchedules: operations.intersectSchedules(LuxonImplementation),
    invertSchedule: operations.invertSchedule(LuxonImplementation),
    joinSchedules: operations.joinSchedules(LuxonImplementation),
    shiftSchedule: operations.shiftSchedule(LuxonImplementation),
    subtractSchedules: operations.subtractSchedules(LuxonImplementation),
    symmetricDifferenceOfSchedules: operations.symmetricDifferenceOfSchedules(LuxonImplementation),
    DailySchedule: schedules.DailySchedule(LuxonImplementation),
    Holidays: schedules.Holidays(LuxonImplementation) as Exports<LuxonTypes>['Holidays'],
    RegularSchedule: schedules.RegularSchedule(LuxonImplementation),
    ScheduleFromIntervals: schedules.ScheduleFromIntervals(LuxonImplementation),
    From: schedules.From(LuxonImplementation),
    Until: schedules.Until(LuxonImplementation),
    Mondays: schedules.Mondays(LuxonImplementation),
    Tuesdays: schedules.Tuesdays(LuxonImplementation),
    Wednesdays: schedules.Wednesdays(LuxonImplementation),
    Thursdays: schedules.Thursdays(LuxonImplementation),
    Fridays: schedules.Fridays(LuxonImplementation),
    Saturdays: schedules.Saturdays(LuxonImplementation),
    Sundays: schedules.Sundays(LuxonImplementation),
    WorkingDays: schedules.WorkingDays(LuxonImplementation),
    Weekends: schedules.Weekends(LuxonImplementation),
    addDurationWithinSchedule: functions.addDurationWithinSchedule(LuxonImplementation),
    isWithinSchedule: functions.isWithinSchedule(LuxonImplementation),
}