import {DateTime, Duration, Interval} from "luxon"
import * as abstract from "../abstract"
import {ScheduleFnsLibrary} from "../abstract"
import {LuxonScheduleFns} from "schedule.js"


type RestParameters<Function extends (...args: any[]) => any> = Function extends (this: ScheduleFnsLibrary<DateTime, Interval, Duration>, ...args: infer P) => any ? P : never;
type _<Function extends (...args: any[]) => any> = Function extends (this: ScheduleFnsLibrary<DateTime, Interval, Duration>, ...args: RestParameters<Function>) => ReturnType<Function> ? (...args: RestParameters<Function>) => ReturnType<Function> : never;

export const isWithinSchedule: _<abstract.isWithinSchedule<DateTime, Interval, Duration>> = LuxonScheduleFns.isWithinSchedule
export const addDurationWithinSchedule: _<abstract.addDurationWithinSchedule<DateTime, Interval, Duration>> = LuxonScheduleFns.addDurationWithinSchedule
export const intersectSchedules: _<abstract.intersectSchedules<DateTime, Interval, Duration>> = LuxonScheduleFns.intersectSchedules
export const invertSchedule: _<abstract.invertSchedule<DateTime, Interval, Duration>> = LuxonScheduleFns.invertSchedule
export const joinSchedules: _<abstract.joinSchedules<DateTime, Interval, Duration>> = LuxonScheduleFns.joinSchedules
export const shiftSchedule: _<abstract.shiftSchedule<DateTime, Interval, Duration>> = LuxonScheduleFns.shiftSchedule
export const subtractSchedules: _<abstract.subtractSchedules<DateTime, Interval, Duration>> = LuxonScheduleFns.subtractSchedules
export const symmetricDifferenceOfSchedules: _<abstract.symmetricDifferenceOfSchedules<DateTime, Interval, Duration>> = LuxonScheduleFns.symmetricDifferenceOfSchedules
export const DailySchedule: _<abstract.DailySchedule<DateTime, Interval, Duration>> = LuxonScheduleFns.DailySchedule
export const Holidays: _<abstract.Holidays<DateTime, Interval, Duration>> = LuxonScheduleFns.Holidays
export const RegularSchedule: _<abstract.RegularSchedule<DateTime, Interval, Duration>> = LuxonScheduleFns.RegularSchedule
export const ScheduleFromIntervals: _<abstract.ScheduleFromIntervals<DateTime, Interval, Duration>> = LuxonScheduleFns.ScheduleFromIntervals
export const From: _<abstract.From<DateTime, Interval, Duration>> = LuxonScheduleFns.From
export const Until: _<abstract.Until<DateTime, Interval, Duration>> = LuxonScheduleFns.Until
export const Mondays: _<abstract.Mondays<DateTime, Interval, Duration>> = LuxonScheduleFns.Mondays
export const Tuesdays: _<abstract.Tuesdays<DateTime, Interval, Duration>> = LuxonScheduleFns.Tuesdays
export const Wednesdays: _<abstract.Wednesdays<DateTime, Interval, Duration>> = LuxonScheduleFns.Wednesdays
export const Thursdays: _<abstract.Thursdays<DateTime, Interval, Duration>> = LuxonScheduleFns.Thursdays
export const Fridays: _<abstract.Fridays<DateTime, Interval, Duration>> = LuxonScheduleFns.Fridays
export const Saturdays: _<abstract.Saturdays<DateTime, Interval, Duration>> = LuxonScheduleFns.Saturdays
export const Sundays: _<abstract.Sundays<DateTime, Interval, Duration>> = LuxonScheduleFns.Sundays
export const Weekends: _<abstract.Weekends<DateTime, Interval, Duration>> = LuxonScheduleFns.Weekends
export const WorkingDays: _<abstract.WorkingDays<DateTime, Interval, Duration>> = LuxonScheduleFns.WorkingDays