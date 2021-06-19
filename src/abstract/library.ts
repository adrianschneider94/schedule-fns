import {addDurationWithinSchedule, isWithinSchedule} from "./misc"
import {DateTimeLibrary} from "./dateTimeLibrary"
import {DailySchedule, From, Holidays, RegularSchedule, ScheduleFromIntervals, Until} from "./schedules"
import {
    Fridays,
    Mondays,
    OnSpecificWeekday,
    Saturdays,
    Sundays,
    Thursdays,
    Tuesdays,
    Wednesdays,
    Weekends,
    WorkingDays
} from "./schedules/weekdays"
import {
    intersectSchedules,
    invertSchedule,
    shiftSchedule,
    subtractSchedules,
    symmetricDifferenceOfSchedules
} from "./operations"
import {getFirstInterval, getLastInterval, joinSchedules} from "./operations/join"

function bindThis<Function extends (this: any, ...args: any[]) => any>(thisArg: any, func: Function): Function {
    return func.bind(thisArg) as unknown as Function
}

export abstract class ScheduleFnsLibrary<DateTime, Interval, Duration> extends DateTimeLibrary<DateTime, Interval, Duration> {
    // Misc
    public isWithinSchedule = bindThis(this, isWithinSchedule)
    public addDurationWithinSchedule = bindThis(this, addDurationWithinSchedule)
    public getFirstInterval = bindThis(this, getFirstInterval)
    public getLastInterval = bindThis(this, getLastInterval)

    // Operations
    public intersectSchedules = bindThis(this, intersectSchedules)
    public invertSchedule = bindThis(this, invertSchedule)
    public joinSchedules = bindThis(this, joinSchedules)
    public shiftSchedule = bindThis(this, shiftSchedule)
    public subtractSchedules = bindThis(this, subtractSchedules)
    public symmetricDifferenceOfSchedules = bindThis(this, symmetricDifferenceOfSchedules)

    // Schedules
    public DailySchedule = bindThis(this, DailySchedule)
    public Holidays = bindThis(this, Holidays)
    public RegularSchedule = bindThis(this, RegularSchedule)
    public ScheduleFromIntervals = bindThis(this, ScheduleFromIntervals)
    public From = bindThis(this, From)
    public Until = bindThis(this, Until)
    public OnSpecificWeekday = bindThis(this, OnSpecificWeekday)
    public Mondays = bindThis(this, Mondays)
    public Tuesdays = bindThis(this, Tuesdays)
    public Wednesdays = bindThis(this, Wednesdays)
    public Thursdays = bindThis(this, Thursdays)
    public Fridays = bindThis(this, Fridays)
    public Saturdays = bindThis(this, Saturdays)
    public Sundays = bindThis(this, Sundays)
    public Weekends = bindThis(this, Weekends)
    public WorkingDays = bindThis(this, WorkingDays)
}

