import * as abstract from "../abstract"
import {ScheduleFnsLibrary} from "../abstract"
import {DateFnsScheduleFns} from "schedule.js"
import {Duration, Interval} from "date-fns"

type DT = Date | number
type I = Interval
type D = Duration

type RestParameters<Function extends (...args: any[]) => any> = Function extends (this: ScheduleFnsLibrary<DT, I, D>, ...args: infer P) => any ? P : never;
type _<Function extends (...args: any[]) => any> = Function extends (this: ScheduleFnsLibrary<DT, I, D>, ...args: RestParameters<Function>) => ReturnType<Function> ? (...args: RestParameters<Function>) => ReturnType<Function> : never;

export const isWithinSchedule: _<abstract.isWithinSchedule<DT, I, D>> = DateFnsScheduleFns.isWithinSchedule
export const addDurationWithinSchedule: _<abstract.addDurationWithinSchedule<DT, I, D>> = DateFnsScheduleFns.addDurationWithinSchedule
export const intersectSchedules: _<abstract.intersectSchedules<DT, I, D>> = DateFnsScheduleFns.intersectSchedules
export const invertSchedule: _<abstract.invertSchedule<DT, I, D>> = DateFnsScheduleFns.invertSchedule
export const joinSchedules: _<abstract.joinSchedules<DT, I, D>> = DateFnsScheduleFns.joinSchedules
export const shiftSchedule: _<abstract.shiftSchedule<DT, I, D>> = DateFnsScheduleFns.shiftSchedule
export const subtractSchedules: _<abstract.subtractSchedules<DT, I, D>> = DateFnsScheduleFns.subtractSchedules
export const symmetricDifferenceOfSchedules: _<abstract.symmetricDifferenceOfSchedules<DT, I, D>> = DateFnsScheduleFns.symmetricDifferenceOfSchedules
export const DailySchedule: _<abstract.DailySchedule<DT, I, D>> = DateFnsScheduleFns.DailySchedule
export const Holidays: _<abstract.Holidays<DT, I, D>> = DateFnsScheduleFns.Holidays
export const RegularSchedule: _<abstract.RegularSchedule<DT, I, D>> = DateFnsScheduleFns.RegularSchedule
export const ScheduleFromIntervals: _<abstract.ScheduleFromIntervals<DT, I, D>> = DateFnsScheduleFns.ScheduleFromIntervals
export const From: _<abstract.From<DT, I, D>> = DateFnsScheduleFns.From
export const Until: _<abstract.Until<DT, I, D>> = DateFnsScheduleFns.Until
export const Mondays: _<abstract.Mondays<DT, I, D>> = DateFnsScheduleFns.Mondays
export const Tuesdays: _<abstract.Tuesdays<DT, I, D>> = DateFnsScheduleFns.Tuesdays
export const Wednesdays: _<abstract.Wednesdays<DT, I, D>> = DateFnsScheduleFns.Wednesdays
export const Thursdays: _<abstract.Thursdays<DT, I, D>> = DateFnsScheduleFns.Thursdays
export const Fridays: _<abstract.Fridays<DT, I, D>> = DateFnsScheduleFns.Fridays
export const Saturdays: _<abstract.Saturdays<DT, I, D>> = DateFnsScheduleFns.Saturdays
export const Sundays: _<abstract.Sundays<DT, I, D>> = DateFnsScheduleFns.Sundays
export const Weekends: _<abstract.Weekends<DT, I, D>> = DateFnsScheduleFns.Weekends
export const WorkingDays: _<abstract.WorkingDays<DT, I, D>> = DateFnsScheduleFns.WorkingDays