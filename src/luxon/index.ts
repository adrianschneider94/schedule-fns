import * as operations from "schedule.js/operations"
import * as schedules from "schedule.js/schedules"
import * as functions from "schedule.js/functions"
import {LuxonImplementation} from "schedule.js/luxon/implementation"
import {Schedule} from "schedule.js"
import {Country, Options} from "date-holidays"
import {DateTime, Duration, Interval} from "luxon"

export const intersectSchedules = operations.intersectSchedules(LuxonImplementation)
export const invertSchedule = operations.invertSchedule(LuxonImplementation)
export const joinSchedules = operations.joinSchedules(LuxonImplementation)
export const shiftSchedule = operations.shiftSchedule(LuxonImplementation)
export const subtractSchedules = operations.subtractSchedules(LuxonImplementation)
export const symmetricDifferenceOfSchedules = operations.symmetricDifferenceOfSchedules(LuxonImplementation)
export const DailySchedule = schedules.DailySchedule(LuxonImplementation)

export function Holidays(country?: Country | string, opts?: Options): Schedule<DateTime, Interval, Duration>
export function Holidays(country?: string, state?: string, opts?: Options): Schedule<DateTime, Interval, Duration>
export function Holidays(country?: string, state?: string, region?: string, opts?: Options): Schedule<DateTime, Interval, Duration>
export function Holidays(...args: any) {
    return schedules.Holidays(LuxonImplementation)(...args)
}

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