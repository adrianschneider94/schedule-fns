import {addDurationWithinSchedule} from "../misc/durations"
import {DateTimeLibrary} from "../dateTimeLibrary"
import {DailySchedule} from "schedule.js/schedules/dailySchedule"
import {Holidays} from "schedule.js/schedules/holidays"
import {RegularSchedule} from "schedule.js/schedules/regularSchedule"
import {ScheduleFromIntervals} from "schedule.js/schedules/scheduleFromIntervals"
import {From, Until} from "schedule.js/schedules/simple"
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
} from "schedule.js/schedules/weekdays"
import {intersectSchedules} from "schedule.js/operations/intersect"
import {getFirstInterval, getLastInterval, joinSchedules} from "schedule.js/operations/join"
import {shiftSchedule} from "schedule.js/operations/shift"
import {invertSchedule} from "schedule.js/operations/invert"
import {subtractSchedules} from "schedule.js/operations/subtract"
import {isWithinSchedule} from "schedule.js/misc/misc"
import {symmetricDifferenceOfSchedules} from "schedule.js/operations/symmetricDifference"


export abstract class ScheduleFnsLibrary<DateTime, Interval, Duration> extends DateTimeLibrary<DateTime, Interval, Duration> {
    // Misc
    public isWithinSchedule = isWithinSchedule
    public addDurationWithinSchedule = addDurationWithinSchedule
    public getFirstInterval = getFirstInterval
    public getLastInterval = getLastInterval

    // Operations
    public intersectSchedules = intersectSchedules
    public invertSchedule = invertSchedule
    public joinSchedules = joinSchedules
    public shiftSchedule = shiftSchedule
    public subtractSchedules = subtractSchedules
    public symmetricDifferenceOfSchedules = symmetricDifferenceOfSchedules

    // Schedules
    public DailySchedule = DailySchedule
    public Holidays = Holidays
    public RegularSchedule = RegularSchedule
    public ScheduleFromIntervals = ScheduleFromIntervals
    public From = From
    public Until = Until
    public OnSpecificWeekday = OnSpecificWeekday
    public Mondays = Mondays
    public Tuesdays = Tuesdays
    public Wednesdays = Wednesdays
    public Thursdays = Thursdays
    public Fridays = Fridays
    public Saturdays = Saturdays
    public Sundays = Sundays
    public Weekends = Weekends
    public WorkingDays = WorkingDays
}
