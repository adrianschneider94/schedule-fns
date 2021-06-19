import {Schedule} from "schedule.js"
import {ScheduleFnsLibrary} from "../library"

export type From<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, startDate: DT) => Schedule<DT, I, D>

export const From: From<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, startDate: DT): Schedule<DT, I, D> {
    return this.ScheduleFromIntervals(this.createInterval(startDate, this.infinityDateTime))
}

export type Until<DT, I, D> = (this: ScheduleFnsLibrary<DT, I, D>, endDate: DT) => Schedule<DT, I, D>

export const Until: Until<any, any, any> = function <DT, I, D>(this: ScheduleFnsLibrary<DT, I, D>, endDate: DT): Schedule<DT, I, D> {
    return this.ScheduleFromIntervals(this.createInterval(this.negativeInfinityDateTime, endDate))
}
